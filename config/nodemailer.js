const nodemailer = require('nodemailer')
const keys = require('../config/keys')

module.exports = (email, password) =>{
    nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            service: keys.nodemailer.service,
            auth: {
                user: keys.nodemailer.auth.user,
                pass: keys.nodemailer.auth.pass
            }
        })

        // setup email data with unicode symbols
        let mailOptions = {
            from: keys.nodemailer.from,
            to: keys.nodemailer.to, //place EMAIL parameter here
            subject: keys.nodemailer.subject,
            text: `${keys.nodemailer.text} ${password}`,
            //html: keys.nodemailer.html
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.json({success: false, message: `error while sending email ${error}`})
            }
            return res.json({success: true, message: `Email sent to  ${email}`})
        })
    })
}



