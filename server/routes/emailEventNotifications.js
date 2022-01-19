const express = require('express'),
  router = express.Router(),
  nodemailer = require('nodemailer')

require('dotenv').config()

const SUPPORT_EMAIL = 'toshvelaga@gmail.com'

router.post('/api/email/support', async (req, res) => {
  const { email, text } = req.body

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  })

  const mailOptions = {
    from: 'Ohmystream <toshvelaga@gmail.com>',
    to: SUPPORT_EMAIL,
    subject: `You have a new support message from ${email}`,
    text: `${text}`,
  }

  return transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.error('there was an error: ', err)
    } else {
      return res.status(201).send('success')
    }
  })
})

module.exports = router
