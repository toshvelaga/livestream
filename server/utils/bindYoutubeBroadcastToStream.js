const { default: axios } = require('axios')
require('dotenv').config()

const bindYoutubeBroadcastToStream = async (
  youtubeBroadcastId,
  youtubeStreamId,
  youtubeAccessToken
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${youtubeAccessToken}`,
      Accept: 'application/json',
    },
  }

  const bindedBroadcast = await axios.post(
    `https://youtube.googleapis.com/youtube/v3/liveBroadcasts/bind?id=${youtubeBroadcastId}&part=id%2Csnippet%2CcontentDetails%2Cstatus&streamId=${youtubeStreamId}&key=${process.env.GOOGLE_API_KEY}`,
    config
  )

  console.log(bindedBroadcast)

  return bindedBroadcast
}

module.exports = bindYoutubeBroadcastToStream
