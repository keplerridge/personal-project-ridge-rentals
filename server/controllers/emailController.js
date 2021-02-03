const nodemailer = require('nodemailer');
require('dotenv').config();
const {EMAIL_PASSWORD, EMAIL_USERNAME} = process.env;
module.exports = {
    sendEmail: async(req, res) => {
        const {firstName, lastName, subject, email, message} = req.body;

        let testAccount = await nodemailer.createTestAccount().catch(err => console.log(err));

        console.log(testAccount);

        let transporter = nodemailer.createTransport({
            host: 'smtp.office365.com', // Office 365 server
            port: 587,     // secure SMTP
            secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
            auth: {
                user: EMAIL_USERNAME,
                pass: EMAIL_PASSWORD
            },
        });

        let info = await transporter.sendMail({
            from: `"${firstName} ${lastName}" <${email}>`, // sender address
            to: `<cory-1122@hotmail.com>, "Ridge Rentals" <cory-1122@hotmail.com>`, // list of receivers
            subject: subject, // Subject line
            text: message, // plain text body
            // html: "<b>Hello world?</b>", // html body
        }).catch(err => console.log(err))

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.sendStatus(200);
    }
}
