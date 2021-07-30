const express = require('express'),
  router = express.Router(),
  pool = require('../db'),
  sendAuthCode = require('../utils/sendAuthCode'),
  validateEmail = require('../utils/validateEmail')

router.post('/user/register', async (req, res) => {
  const { email } = req.body
  const code = Math.floor(100000 + Math.random() * 900000)
  const timeCreated = new Date().toUTCString()

  if (!email) {
    res.send({ error: 'Please do not leave email empty' })
  }
  if (validateEmail(email) == false) {
    res.send({ error: 'Please add a valid email address' })
  } else {
    let newUser = await pool.query(
      'INSERT INTO users (user_email, user_code, user_date_created) VALUES ($1, $2, $3) RETURNING *',
      [email, code, timeCreated]
    )
    sendAuthCode(email, code)

    return res.json(newUser.rows[0])
  }
})
