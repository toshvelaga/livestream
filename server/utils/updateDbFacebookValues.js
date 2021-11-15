const pool = require('../db')

const updateDbFacebookValues = async (
  userId,
  facebookAccessToken,
  longFacebookAccessToken,
  facebookUserId
) => {
  let results = await pool.query(
    `INSERT INTO destinations (
      user_id, 
      facebook_access_token,
      facebook_long_access_token,
      facebook_user_id
    )
	VALUES($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET facebook_access_token = EXCLUDED.facebook_access_token, facebook_long_access_token = EXCLUDED.facebook_long_access_token, facebook_user_id = EXCLUDED.facebook_user_id`,
    [userId, facebookAccessToken, longFacebookAccessToken, facebookUserId]
  )
  return results
}

module.exports = updateDbFacebookValues
