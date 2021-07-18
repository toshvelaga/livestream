const express = require('express'),
  router = express.Router(),
  pool = require('../db')

router.post('/compare-code', async (req, res) => {
  let userEnteredCode = req.body.code
  let userId = req.body.userId
  const date = new Date().toUTCString()

  let code = await pool.query(
    `SELECT user_code FROM users WHERE user_id = $1`,
    [userId]
  )

  pool.query(
    `UPDATE users SET user_set_login = $1 WHERE user_id = $2`,
    [date, userId],
    (q_err, q_res) => {
      res.json(q_res.rows)
    }
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
