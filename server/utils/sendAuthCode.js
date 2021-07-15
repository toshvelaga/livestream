const nodemailer = require('nodemailer')
require('dotenv').config()

const sendAuthCode = (email, code) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  })

  const mailOptions = {
    from: 'toshvelaga@gmail.com',
    to: email,
    subject: 'Livestream 6 digit code',
    text: `Your auth code is ${code}`,
  }

  return transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.error('there was an error: ', err)
    } else {
      res.status(200).json({
        success: 'recovery email sent',
      })
    }
  })
}

module.exports = sendAuthCode
