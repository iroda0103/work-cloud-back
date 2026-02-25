const nodemailer = require("nodemailer");

async function sendMessage({email,code}) {
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "localhost", // host get from cpanel
            service: "gmail",
            secure: true,
            port: 465, // port get from cpanel
            auth: {
                user: 'iroda3242@gmail.com', // generated ethereal user
                pass: 'seiljnkivbuuqdjl', // generated ethereal password
            },
        });

        let info = await transporter.sendMail({
            from: 'iroda3242@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Aliance ✔", // Subject line
            text: "Hello world?",
            html: `<h4>Tasdiqlash kodi: ${code}</h4>`,

        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        //   if(res.status === 200){
        //       return res.json();
        //   }
        //   else{
        //       return 'error'
        //   }
    }
    main().catch(console.error);
}

const Message = Object.freeze({ send: sendMessage })

module.exports = Message