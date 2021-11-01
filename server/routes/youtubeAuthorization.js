const express = require('express'),
  router = express.Router(),
  pool = require('../db'),
  { default: axios } = require('axios')
require('dotenv').config()

router.post('/api/authorize/youtube', async (req, res) => {
  // google docs: https://developers.google.com/youtube/v3/guides/auth/server-side-web-apps
  // auth w curl: https://www.ionos.com/digitalguide/server/tools/introduction-to-curl-in-linux/

  return res.status(200).send({ token: 'hi' })
})

module.exports = router
