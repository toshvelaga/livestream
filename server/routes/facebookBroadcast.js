const express = require('express'),
  router = express.Router(),
  { default: axios } = require('axios')
require('dotenv').config()

// GET PERMALINK_URL

router.post('/api/facebook/broadcast/permalink', async (req, res) => {
  let facebookAccessToken = req.body.facebookAccessToken
  let longFacebookAccessToken = req.body.longFacebookAccessToken
  let facebookLiveVideoId = req.body.facebookLiveVideoId

  let data = await axios
    .post(
      `https://graph.facebook.com/${facebookLiveVideoId}?fields=permalink_url&access_token=${longFacebookAccessToken}`
    )
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })

  return res.send(data.permalink_url)
})

// START THE BROADCAST

router.post('/api/facebook/broadcast', async (req, res) => {
  let facebookUserId = req.body.facebookUserId
  let facebookTitle = req.body.facebookTitle
  let facebookDescription = req.body.facebookDescription
  let facebookAccessToken = req.body.facebookAccessToken
  let longFacebookAccessToken = req.body.longFacebookAccessToken

  let authData = await axios
    .post(
      `https://graph.facebook.com/${facebookUserId}/live_videos?status=LIVE_NOW&title=${facebookTitle}&description=${facebookDescription}&access_token=${longFacebookAccessToken}`
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
  let longFacebookAccessToken = req.body.longFacebookAccessToken

  await axios
    .post(
      `https://graph.facebook.com/v3.3/${liveVideoId}?end_live_video=true&access_token=${longFacebookAccessToken}`
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
