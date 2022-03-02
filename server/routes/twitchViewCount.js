const express = require('express'),
  router = express.Router()

require('dotenv').config()

router.post('/api/twitch/view-count', async (req, res) => {
  // twitch forum: https://discuss.dev.twitch.tv/t/viewer-counter-help/24726/2

  const twitchUserName = req.body.twitchUserName
  const twitchAccessToken = req.body.twitchAccessToken

  let authData = await axios
    .get(`https://api.twitch.tv/helix/streams?user_login=toshvelaga`, {
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
        // return refreshTwitchToken(twitchAccessRefreshToken)
        console.log('the wrong token was used, thats why there is a 401')
      }
    })

  console.log(authData)

  return res.status(201).send({ viewCount: 'send view count' })
})

module.exports = router
