const express = require('express'),
  router = express.Router(),
  { default: axios } = require('axios')
require('dotenv').config()

router.patch('/api/youtube/broadcast', async (req, res) => {
  // youtube api create broadcast

  //   curl --request POST \
  //   'https://youtube.googleapis.com/youtube/v3/liveBroadcasts?part=snippet%2CcontentDetails%2Cstatus%2Cid&key=[YOUR_API_KEY]' \
  //   --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
  //   --header 'Accept: application/json' \
  //   --header 'Content-Type: application/json' \
  //   --data '{"snippet":{"title":"Test broadcast","scheduledStartTime":"YOUR_SCHEDULED_START_TIME","description":"hell"},"contentDetails":{"recordFromStart":true,"enableAutoStart":true,"monitorStream":{"enableMonitorStream":false}},"status":{"privacyStatus":"unlisted","selfDeclaredMadeForKids":true}}' \
  //   --compressed

  return res.send({ msg: 'broadcast' })
})

module.exports = router
