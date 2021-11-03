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

  //   const youtubeBroadcastId = await createYoutubeBroadcast(
  //     youtubeBroadcastTitle,
  //     youtubeBroadcastDescription,
  //     youtubePrivacyPolicy,
  //     youtubeAccessToken
  //   )

  const youtubeStreamId = await createYoutubeStream(
    youtubeBroadcastTitle,
    youtubeBroadcastDescription,
    youtubeAccessToken
  )

  //   await bindYoutubeBroadcastToStream(youtubeBroadcastId, youtubeStreamId)

  return res.send({ msg: 'broadcast success' })
})

module.exports = router
