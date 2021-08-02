const express = require('express'),
  router = express.Router(),
  pool = require('../db')

router.post('api/compare-code', async (req, res) => {
  let userEnteredCode = req.body.code
  let userId = req.body.userId
  const date = new Date().toUTCString()

  let code = await pool.query(
    `SELECT user_code FROM users WHERE user_id = $1`,
    [userId]
  )

  pool.query(`UPDATE users SET user_last_login = $1 WHERE user_id = $2`, [
    date,
    userId,
  ])

  console.log(code)
  console.log(userEnteredCode)

  if (userEnteredCode == code.rows[0].user_code) {
    res.send(200, { match: true })
  } else {
    res.send(200, { match: false })
  }
})

module.exports = router
