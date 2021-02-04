require('dotenv').config();
const nodemailer = require('nodemailer'),
      {EMAIL_PASSWORD, EMAIL_USERNAME} = process.env;

module.exports = {
    sendEmail: async(req, res) => {
        const {firstName, lastName, subject, email, message} = req.body;

        let transporter = nodemailer.createTransport({
            host: "smtp.office365.com", // Office 365 server
            port: 587,     // secure SMTP
            secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
            auth: {
                user: `${EMAIL_USERNAME}`,
                pass: `${EMAIL_PASSWORD}`
            },
        });

        let info = await transporter.sendMail({
            from: `"${EMAIL_USERNAME}" <${EMAIL_USERNAME}>`, // sender address
            to: `${EMAIL_USERNAME}`, // list of receivers
            subject: subject, // Subject line
            text: `Name: ${firstName} ${lastName} \n Email: ${email} \n Message: ${message}`, // plain text body
        }).catch(err => console.log(err))

        res.sendStatus(200);
    }
}