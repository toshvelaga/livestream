const express = require('express')
const router = express.Router()
const pool = require('../db')

router.post('/compare-code', async (req, res) => {
  let userEnteredCode = req.body.code
  let userId = req.body.userId

  let code = await pool.query(
    `SELECT code FROM users WHERE users.user_id = $1`,
    [userId]
  )

  console.log(userEnteredCode && code)
  if (userEnteredCode === code) {
    console.log('the codes you entered match')
  }
})

module.exports = router
