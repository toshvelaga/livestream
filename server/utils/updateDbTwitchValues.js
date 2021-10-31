const pool = require('../db')

const updateDbTwitchValues = async (
  userId,
  twitchAccessToken,
  twitchRefreshToken
) => {
  let results = await pool.query(
    `INSERT INTO destinations (
      user_id, 
      twitch_access_token,
      twitch_refresh_token
    )
	VALUES($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET twitch_access_token = EXCLUDED.twitch_access_token, twitch_refresh_token = EXCLUDED.twitch_refresh_token`,
    [userId, twitchAccessToken, twitchRefreshToken]
  )
  return results
}

module.exports = updateDbTwitchValues
