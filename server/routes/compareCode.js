const express = require('express')
const router = express.Router()
const pool = require('../db')

router.post('/compare-code', async (req, res) => {
  const userEnteredCode = req.body.code
  const userId = req.body.userId

  const codeResult = await pool.query(
    `SELECT user_code FROM users WHERE user_id = $1`,
    [userId]
  )
  let code = codeResult.rows[0].user_code
  console.log(code)
  console.log(userEnteredCode)
  if (userEnteredCode == code) {
    res.send(200, { match: true })
  } else {
    res.send(200, { match: false })
  }
})

module.exports = router
