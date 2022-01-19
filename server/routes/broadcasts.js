const express = require('express'),
  router = express.Router(),
  pool = require('../db'),
  { nanoid } = require('nanoid')

router.post('/api/broadcasts', async (req, res, next) => {
  let timeCreated = new Date().toUTCString()
  let studioId = nanoid()

  const values = [
    req.body.youtubeTitle,
    req.body.youtubeDescription,
    req.body.youtubePrivacyPolicy,
    timeCreated,
    req.body.youtubeDestinationUrl,
    req.body.userId,
    req.body.youtubeBroadcastId,
    req.body.youtubeStreamId,
    req.body.facebookTitle,
    req.body.facebookDescription,
    req.body.facebookLiveVideoId,
    req.body.facebookDestinationUrl,
    studioId,
    req.body.twitchTitle,
    req.body.twitchStreamKey,
    req.body.customRtmpServer,
    req.body.customRtmpStreamKey,
  ]

  let results = await pool.query(
    `INSERT INTO broadcasts (
      youtube_title, 
      youtube_description, 
      youtube_privacy_policy, 
      broadcast_time_created, 
      youtube_destination_url, 
      user_id, 
      youtube_broadcast_id, 
      youtube_stream_id, 
      facebook_title, 
      facebook_description, 
      facebook_live_video_id, 
      facebook_destination_url, 
      studio_id,
      twitch_title,
      twitch_stream_key,
      custom_rtmp_server,
      custom_rtmp_stream_key
    )
		VALUES($1, $2, $3, $4, $5, $6 ,$7, $8, $9, $10, $11, $12, $13, $14, $15, $16,$17) RETURNING *`,
    values
  )
  if (results.rows) {
    return res.send(results.rows[0])
  } else if (err) {
    console.error('there was an error: ', err)
  }
})

router.get('/api/broadcasts', async (req, res) => {
  const userId = req.query.userId
  const studioId = req.query.studioId

  let results = await pool.query(
    `SELECT * FROM broadcasts WHERE (user_id = $1 AND studio_id = $2)`,
    [userId, studioId]
  )
  if (results.rows) {
    return res.send(results.rows[0])
  }
})

module.exports = router
