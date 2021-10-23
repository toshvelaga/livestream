const express = require('express'),
  router = express.Router(),
  { default: axios } = require('axios')
require('dotenv').config()

router.patch('/api/twitch/broadcast', async (req, res) => {
  let twitchTitle = req.body.twitchTitle
  let twitchUserID = req.body.twitchUserID
  let twitchToken = req.body.twitchToken

  const body = { title: twitchTitle }

  let authData = await axios
    .patch(
      `https://api.twitch.tv/helix/channels?broadcaster_id=${twitchUserID}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${twitchToken}`,
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
