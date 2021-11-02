const pool = require('../db')

const updateDbYoutubeValues = async (
  userId,
  youtubeAccessToken,
  youtubeRefreshToken
) => {
  let results = await pool.query(
    `INSERT INTO destinations (
      user_id, 
      youtube_access_token,
      youtube_refresh_token
    )
	VALUES($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET youtube_access_token = EXCLUDED.youtube_access_token, youtube_refresh_token = EXCLUDED.youtube_refresh_token`,
    [userId, youtubeAccessToken, youtubeRefreshToken]
  )
  return results
}

module.exports = updateDbYoutubeValues
