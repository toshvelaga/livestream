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

  const youtubeStream = await createYoutubeStream(
    youtubeBroadcastTitle,
    youtubeBroadcastDescription,
    youtubeAccessToken
  )

  console.log(youtubeStream)
  console.log(youtubeStream.id)
  console.log(youtubeStream.youtubeDestinationUrl)

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

module.exports = router
