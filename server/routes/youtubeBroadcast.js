const express = require('express'),
  bindYoutubeBroadcastToStream = require('../utils/bindYoutubeBroadcastToStream'),
  createYoutubeBroadcast = require('../utils/createYoutubeBroadcast'),
  createYoutubeStream = require('../utils/createYoutubeStream'),
  router = express.Router(),
  { default: axios } = require('axios')
require('dotenv').config()

router.post('/api/youtube/broadcast', async (req, res) => {
  // youtube api create broadcast

  const {
    youtubeBroadcastTitle,
    youtubeBroadcastDescription,
    youtubePrivacyPolicy,
    youtubeAccessToken,
  } = req.body

  const youtubeBroadcastId = await createYoutubeBroadcast(
    youtubeBroadcastTitle,
    youtubeBroadcastDescription,
    youtubePrivacyPolicy,
    youtubeAccessToken
  )

  let youtubeStream = await createYoutubeStream(
    youtubeBroadcastTitle,
    youtubeBroadcastDescription,
    youtubeAccessToken
  )

  // console.log(youtubeStream)
  // console.log(youtubeStream.id)
  // console.log(youtubeStream.youtubeDestinationUrl)

  await bindYoutubeBroadcastToStream(
    youtubeBroadcastId,
    youtubeStream.id,
    youtubeAccessToken
  )

  return res.status(200).send({
    youtubeDestinationUrl: youtubeStream.youtubeDestinationUrl,
    youtubeBroadcastId: youtubeBroadcastId,
    youtubeStreamId: youtubeStream.id,
  })
})

router.post('/api/youtube/broadcast/live', async (req, res) => {
  console.log('transition youtube to live')

  const { youtubeBroadcastId, youtubeAccessToken } = req.body

  console.log('youtube broadcast id ' + youtubeBroadcastId)
  console.log('youtube access token ' + youtubeAccessToken)

  const config = {
    headers: {
      Authorization: `Bearer ${youtubeAccessToken}`,
      Accept: 'application/json',
    },
  }

  await axios
    .post(
      `https://youtube.googleapis.com/youtube/v3/liveBroadcasts/transition?broadcastStatus=live&id=${youtubeBroadcastId}&part=id%2Csnippet`,
      config
    )
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err.response.data)
      console.log(err.response.data.error.details)
      console.log(err.response.data.error.errors)
    })

  return res.status(200).send({ msg: 'youtube going live' })
})

router.post('/api/youtube/broadcast/end', (req, res) => {
  const { youtubeBroadcastId, youtubeAccessToken } = req.body

  const config = {
    headers: {
      Authorization: `Bearer ya29.a0ARrdaM80h8rVBgBuUAMv_AhOfQ_YbSxuVoux-cfbsdryX5il4ZTzY43bvHA04Q7qrrre3AB2BeOnVR2n2shdFSu5uBJ7W3xyo6imDHMPbJhM4Jtv8froB_rJWA3GKtFOaX5dWjTx0Vjvo43ZbMAQXmuVWDGK3A`,
      Accept: 'application/json',
    },
  }

  axios
    .post(
      `https://youtube.googleapis.com/youtube/v3/liveBroadcasts/transition?broadcastStatus=complete&id=${youtubeBroadcastId}&part=snippet%2Cstatus&key=${process.env.GOOGLE_API_KEY}`,
      config
    )
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })

  return res.status(200).send({ msg: 'youtube live stream ended' })
})

module.exports = router
