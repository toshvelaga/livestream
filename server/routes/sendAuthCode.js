const express = require('express')
const router = express.Router()
const pool = require('../db')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
require('dotenv').config()

// reset password logic: https://itnext.io/password-reset-emails-in-your-react-app-made-easy-with-nodemailer-bb27968310d7

router.post('/auth-code', async (req, res) => {
  const email = req.body.email

  try {
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ])

    if (email == '') {
      return res.status(401).json({ email: 'Please do not leave email empty' })
    }

    // if (user.rows.length === 0) {
    //   return res
    //     .status(401)
    //     .json({ email: 'The email you entered does not exist' })
    // }

    const code = await crypto.randomBytes(20).toString('hex')
    const codeExpiration = (await Date.now()) + 3600000

    pool.query(
      `UPDATE users SET
			reset_password_token = $1, 
			reset_password_expires = $2 
			WHERE user_email = $3`,
      [token, tokenExpiration, email]
      // (q_err, q_res) => {
      // 	res.json(q_res.rows);
      // }
    )

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
      subject: 'Link To Reset Password',
      text: `Your auth code is ${code}`,
    }

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('there was an error: ', err)
      } else {
        res.status(200).json({
          success: 'recovery email sent',
        })
      }
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.post('/authy', (req, res) => {
  const email = req.body.email
  const code = Math.floor(100000 + Math.random() * 900000)

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
    subject: 'Link To Reset Password',
    text: `Your auth code is ${code}`,
  }

  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.error('there was an error: ', err)
    } else {
      res.status(200).json({
        success: 'recovery email sent',
      })
    }
  })

  console.log(`code: ${code}`)
})

module.exports = router
