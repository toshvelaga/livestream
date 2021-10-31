const pool = require('../db')

const updateDbFacebookValues = async (userId, longFacebookAccessToken) => {
  let results = await pool.query(
    `INSERT INTO destinations (
      user_id, 
      facebook_access_token
    )
	VALUES($1, $2) ON CONFLICT (user_id) DO UPDATE SET facebook_access_token = EXCLUDED.facebook_access_token`,
    [userId, longFacebookAccessToken]
  )
  return results
}

module.exports = updateDbFacebookValues
