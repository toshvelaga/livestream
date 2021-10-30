const express = require('express'),
  router = express.Router(),
  refreshTwitchToken = require('../utils/refreshTwitchToken'),
  { default: axios } = require('axios')
require('dotenv').config()

router.patch('/api/twitch/broadcast', async (req, res) => {
  // twitch docs: https://dev.twitch.tv/docs/api/reference#get-channel-information

  const userId = req.body.userId
  const twitchUserID = req.body.twitchUserID
  const twitchAccessToken = req.body.twitchAccessToken
  const twitchAccessRefreshToken = req.body.twitchAccessRefreshToken
  const title = req.body.title

  let authData = await axios
    .patch(
      `https://api.twitch.tv/helix/channels?broadcaster_id=${twitchUserID}`,
      { title },
      {
        headers: {
          Authorization: `Bearer 03u8nhj3kfkixq6ch1mq7036a3fk5f`,
          'Client-Id': process.env.TWITCH_CLIENT_ID,
          'Content-Type': 'application/json',
        },
      }
    )
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

  return res.send(authData)
})

module.exports = router
