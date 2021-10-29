const express = require('express'),
  router = express.Router(),
  pool = require('../db')

router.put('/api/destinations', async (req, res) => {
  const userId = req.body.userId
  const twitchUserID = req.body.twitchUserID
  const twitchAccessToken = req.body.twitchAccessToken
  const twitchRefreshToken = req.body.twitchRefreshToken
  const facebookAccessToken = req.body.facebookAccessToken

  let results = await pool.query(
    `INSERT INTO destinations (
      user_id, 
      twitch_user_id, 
      twitch_access_token,
      twitch_refresh_token,
      facebook_access_token
    )
	VALUES($1, $2, $3, $4, $5) ON CONFLICT (user_id) DO UPDATE SET twitch_user_id = EXCLUDED.twitch_user_id, twitch_access_token = EXCLUDED.twitch_access_token, twitch_refresh_token = EXCLUDED.twitch_refresh_token, facebook_access_token = EXCLUDED.facebook_access_token`,
    [
      userId,
      twitchUserID,
      twitchAccessToken,
      twitchRefreshToken,
      facebookAccessToken,
    ]
  )
  if (results.rows) {
    return res.send(results.rows[0])
  } else if (err) {
    console.error('there was an error: ', err)
  }
})

module.exports = router
