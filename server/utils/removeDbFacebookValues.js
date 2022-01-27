const pool = require('../db')

const removeDbFacebookValues = async (
  userId,
  facebookAccessToken,
  longFacebookAccessToken
) => {
  let results = await pool.query(
    `INSERT INTO destinations (
      user_id, 
      facebook_access_token,
      facebook_long_access_token
    )
	VALUES($1, $2, $3, $4) ON CONFLICT (user_id) DO UPDATE SET facebook_access_token = EXCLUDED.facebook_access_token, facebook_long_access_token = EXCLUDED.facebook_long_access_token`,
    [userId, facebookAccessToken, longFacebookAccessToken]
  )
  return results
}

module.exports = removeDbFacebookValues
