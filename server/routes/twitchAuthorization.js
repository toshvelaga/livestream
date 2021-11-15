const express = require('express'),
  router = express.Router(),
  updateDbTwitchValues = require('../utils/updateDbTwitchValues'),
  pool = require('../db'),
  { default: axios } = require('axios')
require('dotenv').config()

router.post('/api/authorize/twitch', async (req, res) => {
  let authorizationCode = req.body.authorizationCode

  const twitchRedirectUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.TWITCH_REDIRECT_URL_PROD
      : process.env.TWITCH_REDIRECT_URL_DEV

  let authData = await axios
    .post(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET}&code=${authorizationCode}&grant_type=authorization_code&redirect_uri=${twitchRedirectUrl}`
    )
    .then((res) => {
      console.log(res.data)
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })

  return res.send(authData)
})

router.post('/api/authorize/twitch/refresh', async (req, res) => {
  const userId = req.body.userId
  const refreshToken = req.body.refreshToken

  let data = await axios
    .post(
      `https://id.twitch.tv/oauth2/token?grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET}`
    )
    .then((res) => {
      console.log(res.data)
      console.log('user id ' + userId)
      console.log('twitch access token on server ' + res.data.access_token)
      console.log('twitch refresh token on server ' + res.data.refresh_token)

      const { access_token, refresh_token } = res.data
      updateDbTwitchValues(userId, access_token, refresh_token)

      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
  // console.log(data)
  return res.status(200).send(data)
})

module.exports = router
