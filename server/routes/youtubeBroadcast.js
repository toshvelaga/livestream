const express = require('express'),
  createYoutubeStream = require('../utils/createYoutubeStream'),
  router = express.Router(),
  { default: axios } = require('axios')
require('dotenv').config()

router.post('/api/youtube/broadcast', async (req, res) => {
  // youtube api create broadcast

  const {
    youtubeBroadcastTitle,
    youtubeBroadcastDescription,
    youtubePrivacyStatus,
    youtubeAccessToken,
  } = req.body

  //   const data = {
  //     snippet: {
  //       title: 'Test broadcast',
  //       scheduledStartTime: `${new Date().toISOString()}`,
  //       description: 'hell',
  //     },
  //     contentDetails: {
  //       recordFromStart: true,
  //       enableAutoStart: true,
  //       monitorStream: { enableMonitorStream: false },
  //     },
  //     status: { privacyStatus: 'unlisted', selfDeclaredMadeForKids: true },
  //   }

  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${youtubeAccessToken}`,
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   }

  //   let broadcast = await axios.post(
  //     `https://youtube.googleapis.com/youtube/v3/liveBroadcasts?part=snippet%2CcontentDetails%2Cstatus%2Cid&key=${process.env.GOOGLE_API_KEY}`,
  //     data,
  //     config
  //   )

  //   console.log(broadcast.data)

  createYoutubeStream(youtubeAccessToken)

  return res.send({ msg: 'broadcast success' })
})

module.exports = router
