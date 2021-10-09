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
    from: 'Ohmystream <toshvelaga@gmail.com>',
    to: email,
    subject: 'Ohmystream 6 digit code',
    text: `Your code is ${code}.`,
  }

  return transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.error('there was an error: ', err)
    } else {
      console.log('success')
    }
  })
}

module.exports = sendAuthCode
