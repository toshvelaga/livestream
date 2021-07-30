const express = require('express'),
  router = express.Router(),
  pool = require('../db')

router.put('/api/destinations', (req, res, next) => {
  const values = [
    req.body.twitchStreamKey,
    req.body.youtubeStreamKey,
    req.body.facebookStreamKey,
    req.body.userId,
  ]

  pool.query(
    `INSERT INTO destinations (twitch_stream_key, youtube_stream_key, facebook_stream_key, user_id)
			VALUES($1, $2, $3, $4)
			ON CONFLICT (user_id) DO UPDATE SET twitch_stream_key = EXCLUDED.twitch_stream_key, 
			youtube_stream_key = EXCLUDED.youtube_stream_key, facebook_stream_key = EXCLUDED.facebook_stream_key, 
			user_id = EXCLUDED.user_id`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err)
      res.json(q_res.rows)
    }
  )
})

router.post('/api/destinations', async (req, res) => {
  const userId = req.body.userId

  let results = await pool.query(
    `SELECT * FROM destinations WHERE user_id = $1`,
    [userId]
  )
  if (results.rows) {
    res.send(results.rows[0])
  }
})

module.exports = router
