const express = require('express')
const router = express.Router()
const pool = require('../db')

router.post('/compare-code', async (req, res) => {
  let userEnteredCode = req.body.code
  let user_id = req.body.user_id

  let code = await pool.query(
    `SELECT code FROM users WHERE users.user_id = $1`,
    [user_id]
  )

  console.log(userEnteredCode && code)
})

module.exports = router
