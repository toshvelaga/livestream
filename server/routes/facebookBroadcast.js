const express = require('express'),
  router = express.Router(),
  pool = require('../db'),
  { default: axios } = require('axios')
require('dotenv').config()

router.post('/api/facebook/broadcast', async (req, res) => {
  let facebookTitle = req.body.facebookTitle
  let facebookDescription = req.body.facebookDescription
  let facebookAccessToken = req.body.facebookAccessToken

  let authData = await axios
    .post(
      `https://graph.facebook.com/v3.3/me/live_videos?title=${facebookTitle}&description=${facebookDescription}?status=LIVE_NOW&access_token=${facebookAccessToken}`
    )
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })

  return res.send(authData)
})

// END BROADCAST

router.post('/api/facebook/broadcast/end', async (req, res) => {
  let liveVideoId = req.body.facebookLiveVideoId
  let accessToken = req.body.accessToken

  await axios
    .post(
      `https://graph.facebook.com/v3.3/${liveVideoId}?end_live_video=true&access_token=${accessToken}`
    )
    .then((res) => {
      console.log(res)
      return res
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
