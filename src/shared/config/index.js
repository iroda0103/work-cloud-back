const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    url: process.env.DB_URL
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  vnc:{
    password:process.env.VNC_PASSWORD
  },
  guacamole:{
    url:process.env.GUACAMOLE_URL
  }
};
