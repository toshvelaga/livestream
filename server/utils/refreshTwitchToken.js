const { default: axios } = require('axios')
require('dotenv').config()

const refreshTwitchToken = async (refreshToken) => {
  const data = await axios
    .post(
      `https://id.twitch.tv/oauth2/token?grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET}`
    )
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
  return data
}

module.exports = refreshTwitchToken
