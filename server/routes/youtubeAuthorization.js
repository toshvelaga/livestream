const express = require('express'),
  router = express.Router(),
  pool = require('../db'),
  { default: axios } = require('axios')
require('dotenv').config()

router.post('/api/authorize/youtube', async (req, res) => {
  // google docs: https://developers.google.com/youtube/v3/guides/auth/server-side-web-apps

  // auth w curl: https://www.ionos.com/digitalguide/server/tools/introduction-to-curl-in-linux/

  const { code } = req.body

  var dataString = `code=${code}&client_id=${process.env.YOUTUBE_CLIENT_ID}&client_secret=${process.env.YOUTUBE_CLIENT_SECRET}&redirect_uri=${process.env.YOUTUBE_REDIRECT_URL}&grant_type=authorization_code`

  const youtubedata = await axios.post(
    'https://accounts.google.com/o/oauth2/token',
    dataString
  )

  console.log(youtubedata.data)

  return res.status(200).send({ msg: 'it works' })
})

router.post('/api/authorize/youtube/refresh', async (req, res) => {
  const { refreshToken } = req.body

  // switch this out homie
  var dataString = `client_id=${process.env.YOUTUBE_CLIENT_ID}&client_secret=${process.env.YOUTUBE_CLIENT_SECRET}&refresh_token=${refreshToken}&grant_type=refresh_token`

  const youtubedata = await axios.post(
    'https://accounts.google.com/o/oauth2/token',
    dataString
  )

  console.log(youtubedata.data)

  return res.status(200).send({ msg: 'it works' })
})

module.exports = router
