const express = require('express'),
  router = express.Router(),
  pool = require('../db'),
  { default: axios } = require('axios')
require('dotenv').config()

router.post('/api/authorize/facebook', async (req, res) => {
  // fB docs: https://developers.facebook.com/docs/pages/access-tokens/
  const { facebookAccessToken } = req.body

  const data = await axios.get(
    `https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_APP_SECRET}&fb_exchange_token=${facebookAccessToken}`
  )

  console.log(data)
  console.log('get long facebook token')
  if (data) {
    return res.status(200).send(data)
  }
})

module.exports = router
