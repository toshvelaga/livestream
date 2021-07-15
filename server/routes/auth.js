const express = require('express')
const router = express.Router()
const pool = require('../db')
const validInfo = require('../middleware/validInfo')

router.post('/user/register', async (req, res) => {
  const email = req.body.email
  const code = Math.floor(100000 + Math.random() * 900000)
  const timeCreated = new Date().toUTCString()

  if (!email) {
    console.log('do not leave email empty')
    return res.status(401).json({ error: 'Please do not leave email empty' })
  }

  let newUser = await pool.query(
    'INSERT INTO users (user_email, user_code, user_date_created) VALUES ($1, $2, $3) RETURNING *',
    [email, code, timeCreated]
  )

  await sendAuthCode(email, code)

  return newUser.rows[0]
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

module.exports = router
