const updateDbFacebookValues = require('../utils/updateDbFacebookValues')

const express = require('express'),
  router = express.Router(),
  pool = require('../db'),
  { default: axios } = require('axios')
require('dotenv').config()

router.post('/api/authorize/facebook', async (req, res) => {
  // fB docs: https://developers.facebook.com/docs/pages/access-tokens/
  const { userId } = req.body
  const { facebookAccessToken } = req.body

  const result = await axios.get(
    `https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_APP_SECRET}&fb_exchange_token=${facebookAccessToken}`
  )

  console.log('get long FB access token ' + result.data.access_token)
  const longFacebookAccessToken = result.data.access_token

  updateDbFacebookValues(userId, facebookAccessToken, longFacebookAccessToken)
  return res
    .status(200)
    .send({ longFacebookAccessToken: longFacebookAccessToken })
})

module.exports = router
