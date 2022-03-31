const express = require('express'),
  router = express.Router(),
  pool = require('../db')

// I GUESS I AM JUST USING THIS FOR TWITCH: twitchDestinationUtils.js
router.put('/api/destinations', async (req, res) => {
  const userId = req.body.userId
  const twitchUserID = req.body.twitchUserID
  const twitchAccessToken = req.body.twitchAccessToken
  const twitchRefreshToken = req.body.twitchRefreshToken
  const twitchStreamKey = req.body.twitchStreamKey
  const twitchUsername = req.body.twitchUsername

  let results = await pool.query(
    `INSERT INTO destinations (
      user_id, 
      twitch_user_id, 
      twitch_access_token,
      twitch_refresh_token,
      twitch_stream_key,
      twitch_user_name
    )
	VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT (user_id) DO UPDATE SET twitch_user_id = EXCLUDED.twitch_user_id, twitch_access_token = EXCLUDED.twitch_access_token, twitch_refresh_token = EXCLUDED.twitch_refresh_token, twitch_stream_key = EXCLUDED.twitch_stream_key, twitch_user_name = EXCLUDED.twitch_user_name`,
    [
      userId,
      twitchUserID,
      twitchAccessToken,
      twitchRefreshToken,
      twitchStreamKey,
      twitchUsername,
    ]
  )
  if (results.rows) {
    return res.send(results.rows[0])
  } else if (err) {
    console.error('there was an error: ', err)
  }
})

router.put('/api/destinations/youtube', async (req, res) => {
  const userId = req.body.userId
  const youtubeAccessToken = req.body.youtubeAccessToken

  let results = await pool.query(
    `INSERT INTO destinations (
      user_id, 
      youtube_access_token
    )
	VALUES($1, $2) ON CONFLICT (user_id) DO UPDATE SET youtube_access_token = EXCLUDED.youtube_access_token`,
    [userId, youtubeAccessToken]
  )
  if (results.rows) {
    return res.send(results.rows[0])
  } else if (err) {
    console.error('there was an error: ', err)
  }
})

router.post('/api/destinations', async (req, res) => {
  const userId = req.body.userId

  let results = await pool.query(
    `SELECT * FROM destinations WHERE user_id = $1`,
    [userId]
  )
  if (results.rows) {
    return res.send(results.rows[0])
  }
})

module.exports = router
