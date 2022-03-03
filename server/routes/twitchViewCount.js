const express = require('express'),
  router = express.Router(),
  { default: axios } = require('axios')

require('dotenv').config()

router.post('/api/twitch/view-count', async (req, res) => {
  // twitch forum: https://discuss.dev.twitch.tv/t/viewer-counter-help/24726/2

  // https://discuss.dev.twitch.tv/t/getting-stream-viewer-count-webhook-notifications/20645/5

  const twitchUsername = req.body.twitchUsername
  const twitchAccessToken = req.body.twitchAccessToken

  let resData = await axios
    .get(`https://api.twitch.tv/helix/streams?user_login=${twitchUsername}`, {
      headers: {
        Authorization: `Bearer ${twitchAccessToken}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err.response.status)
      if (err.response.status === 401) {
        console.log('the wrong token was used, thats why there is a 401')
      }
    })

  return res.status(201).send({ data: resData.data })
})

module.exports = router
