const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config=require('./shared/config')
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (Vue.js uchun)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// In-memory database (MVP uchun)
const users = new Map();

// Helper: Linux user yaratish
async function createLinuxUser(username, password) {
    try {
        // User mavjudligini tekshirish
        try {
            await execAsync(`id ${username}`);
            console.log(`User ${username} already exists`);
            return true;
        } catch {
            // User yo'q, yaratamiz
        }

        // User yaratish
        await execAsync(`useradd -m -s /bin/bash ${username}`);
        await execAsync(`echo "${username}:${password}" | chpasswd`);

        // VNC xstartup fayl
        const xstartup = `#!/bin/bash
xrdb $HOME/.Xresources
startxfce4 &`;

        await execAsync(`mkdir -p /home/${username}/.vnc`);
        await execAsync(`echo '${xstartup}' > /home/${username}/.vnc/xstartup`);
        await execAsync(`chmod +x /home/${username}/.vnc/xstartup`);
        await execAsync(`chown -R ${username}:${username} /home/${username}/.vnc`);

        console.log(`✅ User ${username} created successfully`);
        return true;
    } catch (error) {
        console.error(`❌ Error creating user ${username}:`, error.message);
        return false;
    }
}

// Helper: VNC server ishga tushirish
async function startVNCServer(username, display = 1) {
    try {
        const vncPassword = config.vnc.password || 'vnc123';

        // Eski sessionni o'chirish
        try {
            await execAsync(`su - ${username} -c "vncserver -kill :${display}"`);
        } catch {
            // Ignore if no session exists
        }

        // VNC parolni o'rnatish
        await execAsync(`su - ${username} -c "mkdir -p ~/.vnc"`);
        await execAsync(`su - ${username} -c "echo '${vncPassword}' | vncpasswd -f > ~/.vnc/passwd"`);
        await execAsync(`su - ${username} -c "chmod 600 ~/.vnc/passwd"`);

        // VNC server ishga tushirish
        await execAsync(`su - ${username} -c "vncserver :${display} -geometry 1920x1080 -depth 24"`);

        console.log(`✅ VNC server started for ${username} on :${display}`);
        return { display, port: 5900 + display };
    } catch (error) {
        console.error(`❌ Error starting VNC for ${username}:`, error.message);
        throw error;
    }
}

// Helper: Guacamole token yaratish
function generateGuacamoleToken(username, display) {
    const connection = {
        connection: {
            type: "vnc",
            settings: {
                hostname: "localhost",
                port: String(5900 + display),
                password: config.vnc.password || "vnc123"
            }
        }
    };

    return Buffer.from(JSON.stringify(connection)).toString('base64');
}

// ==================== ROUTES ====================

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Register user (MVP uchun oddiy)
app.post('/api/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Validation
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }

        if (users.has(username)) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Linux user yaratish
        const created = await createLinuxUser(username, password);
        if (!created) {
            return res.status(500).json({ error: 'Failed to create system user' });
        }

        // Ma'lumotlarni saqlash
        users.set(username, {
            username,
            password: hashedPassword,
            email: email || '',
            createdAt: new Date(),
            vncDisplay: users.size + 1 // Har user uchun alohida display
        });

        res.json({
            message: 'User registered successfully',
            username
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        console.log('sorov keldi',req.body)
        const { username, password } = req.body;

        const user = users.get(username);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // JWT token yaratish
        const token = jwt.sign(
            { username: user.username },
            config.jwt.secret,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: { username: user.username, email: user.email }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Start workspace
app.post('/api/workspace/start', async (req, res) => {
    try {
        // Token tekshirish
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, config.jwt.secret);
        const user = users.get(decoded.username);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // VNC server ishga tushirish
        const vnc = await startVNCServer(user.username, user.vncDisplay);

        // Guacamole URL yaratish
        const guacToken = generateGuacamoleToken(user.username, vnc.display);
        const guacamoleUrl = `${config.guacamole.url}/#/?token=${guacToken}`;

        res.json({
            message: 'Workspace started',
            workspaceUrl: guacamoleUrl,
            display: vnc.display
        });
    } catch (error) {
        console.error('Workspace start error:', error);
        res.status(500).json({ error: 'Failed to start workspace' });
    }
});

// List active users (Admin)
app.get('/api/users', (req, res) => {
    const userList = Array.from(users.values()).map(u => ({
        username: u.username,
        email: u.email,
        createdAt: u.createdAt,
        vncDisplay: u.vncDisplay
    }));

    res.json({ users: userList, count: userList.length });
});

// Start server
const PORT = config.port || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Work Cloud Backend running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
});