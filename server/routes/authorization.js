const express = require('express'),
  router = express.Router(),
  pool = require('../db')

router.post('/api/user/register', async (req, res) => {
  return res.send({ msg: 'Authorize via Twitch' })
})

module.exports = router
