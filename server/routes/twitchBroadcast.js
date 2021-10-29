const express = require('express'),
  router = express.Router(),
  { default: axios } = require('axios')
require('dotenv').config()

router.patch('/api/twitch/broadcast', async (req, res) => {
  const twitchUserID = req.body.twitchUserID
  const twitchAccessToken = req.body.twitchAccessToken
  const title = req.body.title

  let authData = await axios
    .patch(
      `https://api.twitch.tv/helix/channels?broadcaster_id=${twitchUserID}`,
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
    .catch((err) => console.log(err))

  return res.send(authData)
})

module.exports = router
