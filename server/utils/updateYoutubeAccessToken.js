const pool = require('../db')

const updateYoutubeAccessToken = async (userId, youtubeAccessToken) => {
  let results = await pool.query(
    `INSERT INTO destinations (
      user_id, 
      youtube_access_token
    )
	VALUES($1, $2) ON CONFLICT (user_id) DO UPDATE SET youtube_access_token = EXCLUDED.youtube_access_token`,
    [userId, youtubeAccessToken]
  )
  return results
}

module.exports = updateYoutubeAccessToken
