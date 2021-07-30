const express = require('express'),
  router = express.Router(),
  pool = require('../db')

router.post('/api/referral/email', async (req, res) => {
  const referralEmail = req.body.referralEmail
  const userEmail = req.body.userEmail

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  })

  const mailOptions = {
    from: userEmail,
    to: referralEmail,
    subject: 'Livestreaming Invite',
    text: `You have been invited to join livestreaming.`,
  }

  if (!referralEmail) {
    res.send({ error: 'Please add an email to refer' })
  }
  if (validateEmail(referralEmail) == false) {
    res.send({ error: 'Please add a valid email address to refer' })
  } else {
    return transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('there was an error: ', err)
      } else {
        console.log('success')
      }
    })
  }
})
