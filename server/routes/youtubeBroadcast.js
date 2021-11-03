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
    youtubeBroadcastId,
    youtubeStreamId,
  } = req.body

  //   const youtubeBroadcastId = await createYoutubeBroadcast(
  //     youtubeBroadcastTitle,
  //     youtubeBroadcastDescription,
  //     youtubePrivacyPolicy,
  //     youtubeAccessToken
  //   )

  //   const youtubeStream = await createYoutubeStream(
  //     youtubeBroadcastTitle,
  //     youtubeBroadcastDescription,
  //     youtubeAccessToken
  //   )
  //   console.log(youtubeStream)
  //   const youtubeStreamId = youtubeStream.id

  await bindYoutubeBroadcastToStream(
    youtubeBroadcastId,
    youtubeStreamId,
    youtubeAccessToken
  )

  console.log(bindYoutubeBroadcastToStream)

  return res.send({ msg: 'success' })
})

module.exports = router
