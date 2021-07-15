const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const pool = require('../db')
const validInfo = require('../middleware/validInfo')
const jwtGenerator = require('../utils/jwtGenerator')
const authorize = require('../middleware/authorize')

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
  const { email, password } = req.body

  try {
    const user = await pool.query(`SELECT * FROM users WHERE user_email = $1`, [
      email,
    ])

    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ email: 'No email is associated with that account' })
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    )

    if (!validPassword) {
      return res
        .status(401)
        .json({ password: 'The password entered is not correct' })
    }
    const jwtToken = jwtGenerator(user.rows[0].user_id)
    return res.json({ jwtToken })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error occurred while logging in')
  }
})

router.post('/verify', authorize, async (req, res) => {
  try {
    res.json(true)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
