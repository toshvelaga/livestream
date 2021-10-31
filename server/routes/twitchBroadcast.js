const express = require('express'),
  router = express.Router(),
  refreshTwitchToken = require('../utils/refreshTwitchToken'),
  updateDbTwitchValues = require('../utils/updateDbTwitchValues'),
  { default: axios } = require('axios')
require('dotenv').config()

router.patch('/api/twitch/broadcast', async (req, res) => {
  // twitch docs: https://dev.twitch.tv/docs/api/reference#get-channel-information

  const userId = req.body.userId
  const twitchUserId = req.body.twitchUserId
  const twitchAccessToken = req.body.twitchAccessToken
  const twitchAccessRefreshToken = req.body.twitchAccessRefreshToken
  const title = req.body.title

  console.log('twitch access token ' + twitchAccessToken)
  console.log('twitch user id ' + twitchUserId)

  let authData = await axios
    .patch(
      `https://api.twitch.tv/helix/channels?broadcaster_id=${twitchUserId}`,
      { title },
      {
        headers: {
          Authorization: `Bearer ${twitchAccessToken}`,
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

  await updateDbTwitchValues(
    userId,
    twitchAccessToken,
    twitchAccessRefreshToken
  )

  return res.send(authData)
})

module.exports = router
