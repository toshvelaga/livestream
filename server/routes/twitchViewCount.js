const express = require('express'),
  router = express.Router(),
  { default: axios } = require('axios')

require('dotenv').config()

router.post('/api/twitch/view-count', async (req, res) => {
  // twitch forum: https://discuss.dev.twitch.tv/t/viewer-counter-help/24726/2

  const twitchUserName = req.body.twitchUserName
  const twitchAccessToken = req.body.twitchAccessToken

  let resData = await axios
    .get(`https://api.twitch.tv/helix/streams?user_login=${twitchUserName}`, {
      headers: {
        Authorization: `Bearer ${twitchAccessToken}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log(res)
      return res
    })
    .catch((err) => {
      console.log(err.response.status)
      if (err.response.status === 401) {
        console.log('the wrong token was used, thats why there is a 401')
      }
    })

  console.log(resData)

  return res.status(201).send(resData.data)
})

module.exports = router
