const express = require('express')
const router = express.Router()
const pool = require('../db')

router.post('/compare-code', async (req, res) => {
  let userEnteredCode = req.body.code
  let userId = req.body.userId

  let code = await pool.query(
    `SELECT user_code FROM users WHERE user_id = $1`,
    [userId]
  )

  console.log(code)
  console.log(userEnteredCode)

  if (userEnteredCode == code.rows[0].user_code) {
    res.send(200, { match: true })
  } else {
    res.send(200, { match: false })
  }
})

module.exports = router
