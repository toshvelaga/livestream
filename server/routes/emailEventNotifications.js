const express = require('express'),
  router = express.Router(),
  nodemailer = require('nodemailer')

require('dotenv').config()

const SUPPORT_EMAIL = 'ohmystreamer@gmail.com'

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
    from: 'Ohmystream <ohmystreamer@gmail.com>',
    to: SUPPORT_EMAIL,
    subject: `You have a new support message from ${email}`,
    html: `<p>MESSAGE FROM: ${email}</p><p>${text}</p>`,
  }

  return transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.error('there was an error: ', err)
    } else {
      return res.status(201).send('success')
    }
  })
})

router.post('/api/email/payment-button-click', async (req, res) => {
  const { email } = req.body

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  })

  const mailOptions = {
    from: 'Ohmystream <ohmystreamer@gmail.com>',
    to: SUPPORT_EMAIL,
    subject: `An ohmystream user ${email} clicked the payment button`,
    html: `<p>An ohmystream user ${email} clicked the payment upgrade button</p>`,
  }

  return transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.error('there was an error: ', err)
    } else {
      return res.status(201).send('success')
    }
  })
})

router.post('/api/email/user-went-live', async (req, res) => {
  const { email, destinations } = req.body

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  })

  const mailOptions = {
    from: 'Ohmystream <ohmystreamer@gmail.com>',
    to: SUPPORT_EMAIL,
    subject: `An ohmystream user ${email} just went LIVE`,
    html: `<p>An ohmystream user ${email} clicked the GO LIVE button and is streaming to ${destinations}</p>`,
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
