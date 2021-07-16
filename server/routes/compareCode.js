const express = require('express')
const router = express.Router()
const pool = require('../db')

router.post('/compare-code', async (req, res) => {
  let userEnteredCode = req.body.code
  let userId = req.body.userId

  let codeResult = await pool.query(
    `SELECT user_code FROM users WHERE user_id = $1`,
    [userId]
  )
  let code = codeResult.rows[0].user_code
  console.log(code)
  console.log(userEnteredCode)
  if (userEnteredCode === code) {
    console.log('the codes you entered match')
  }
})

module.exports = router
