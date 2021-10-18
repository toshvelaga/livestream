const express = require('express'),
  router = express.Router(),
  pool = require('../db'),
  { default: axios } = require('axios')
require('dotenv').config()

router.post('/api/authorize/twitch', async (req, res) => {
  let authorizationCode = req.body.authorizationCode
  let authData = await axios
    .post(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET}&code=${authorizationCode}&grant_type=authorization_code&redirect_uri=${process.env.TWITCH_REDIRECT_URL}`
    )
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })

  return res.send(authData)
})

router.post('/api/authorize/twitch/refresh', async (req, res) => {
  let refreshToken = req.body.refreshToken

  return axios
    .post(
      `https://id.twitch.tv/oauth2/token
    --data-urlencode
    ?grant_type=refresh_token
    &refresh_token=${refreshToken}
    &client_id=${process.env.TWITCH_CLIENT_ID}
    &client_secret=${process.env.TWITCH_SECRET}`
    )
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
