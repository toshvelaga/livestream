const express = require('express'),
  router = express.Router(),
  pool = require('../db'),
  { nanoid } = require('nanoid')

router.post('/api/broadcasts', (req, res, next) => {
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
    req.body.streamId,
    req.body.facebookTitle,
    req.body.facebookDescription,
    req.body.facebookLiveVideoId,
    req.body.facebookDestinationUrl,
    studioId,
  ]

  pool.query(
    `INSERT INTO broadcasts (youtube_title, youtube_description, youtube_privacy_policy, broadcast_time_created, youtube_destination_url, user_id, youtube_broadcast_id, stream_id, facebook_title, facebook_description, facebook_live_video_id, facebook_destination_url)
		VALUES($1, $2, $3, $4, $5, $6 ,$7, $8, $9, $10, $11, $12, $13)`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err)
      res.json(q_res.rows)
    }
  )
})

router.get('/api/broadcasts', async (req, res) => {
  const userId = req.body.userId

  let results = await pool.query(
    `SELECT * FROM broadcasts WHERE user_id = $1`,
    [userId]
  )
  if (results.rows) {
    res.send(results.rows[0])
  }
})

module.exports = router
