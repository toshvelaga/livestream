const express = require('express')
const router = express.Router()
const pool = require('../db')
const validInfo = require('../middleware/validInfo')

router.post('/user/register', validInfo, async (req, res) => {
  const { email } = req.body

  try {
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ])

    if (email == '') {
      return res.status(401).json({ email: 'Please add your email' })
    }

    if (user.rows.length > 0) {
      return res.status(401).json({ user: 'User already exists' })
    }

    let newUser = await pool.query(
      'INSERT INTO users (user_email) VALUES ($1) RETURNING *',
      [email]
    )

    const jwtToken = 'hello'

    return res.json({ jwtToken })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error occured while registering')
  }
})

router.post('/user/login', async (req, res) => {
  const { email } = req.body

  try {
    const user = await pool.query(`SELECT * FROM users WHERE user_email = $1`, [
      email,
    ])

    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ email: 'No email is associated with that account' })
    }

    return res.json('login')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error occurred while logging in')
  }
})

router.post('/authy', async (req, res) => {
  const email = req.body.email
  const code = Math.floor(100000 + Math.random() * 900000)
  const timeCreated = new Date().toUTCString()

  if (!email) {
    console.log('do not leave email empty')
    return res.status(401).json({ error: 'Please do not leave email empty' })
  }

  await pool.query(
    'INSERT INTO users (user_email, user_code, user_date_created) VALUES ($1, $2, $3) RETURNING *',
    [email, code, timeCreated]
  )

  sendAuthCode(email, code)
})

module.exports = router
