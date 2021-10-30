const express = require('express'),
  router = express.Router(),
  refreshTwitchToken = require('../utils/refreshTwitchToken'),
  { default: axios } = require('axios')
require('dotenv').config()

router.patch('/api/twitch/broadcast', async (req, res) => {
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
    .catch(async (err, twitchUserID, title) => {
      console.log(err.response.status)
      if (err.response.status === 401) {
        // return refreshTwitchToken(twitchAccessRefreshToken)
        let data = await refreshTwitchToken(twitchAccessRefreshToken)
        console.log(data)
        const { access_token, refresh_token } = data
        // add access_token and refresh_token to DB
        // await updateDbTwitchValues(userId, access_token, refresh_token)
        console.log(access_token)

        // setTimeout(() => {
        //   axios.patch(
        //     `https://api.twitch.tv/helix/channels?broadcaster_id=${twitchUserID}`,
        //     { title: 'hello' },
        //     {
        //       headers: {
        //         Authorization: `Bearer ${access_token}`,
        //         'Client-Id': process.env.TWITCH_CLIENT_ID,
        //         'Content-Type': 'application/json',
        //       },
        //     }
        //   )
        // }, 5000)
      }
    })

  return res.send(authData)
})

module.exports = router
