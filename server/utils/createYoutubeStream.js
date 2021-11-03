const { default: axios } = require('axios')
require('dotenv').config()

const createYoutubeStream = async (
  youtubeBroadcastTitle,
  youtubeBroadcastDescription,
  youtubeAccessToken
) => {
  const data = {
    snippet: {
      title: youtubeBroadcastTitle,
      description: youtubeBroadcastDescription,
    },
    cdn: {
      format: '',
      ingestionType: 'rtmp',
      frameRate: 'variable',
      resolution: 'variable',
    },
    contentDetails: { isReusable: true },
  }

  const config = {
    headers: {
      Authorization: `Bearer ${youtubeAccessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  const stream = await axios
    .post(
      `https://youtube.googleapis.com/youtube/v3/liveStreams?part=snippet%2Ccdn%2CcontentDetails%2Cstatus&key=${process.env.GOOGLE_API_KEY}`,
      data,
      config
    )
    .then((res) => {
      console.log(res)
      return res
    })
    .catch((error) => {
      console.log(error)
    })

  return stream
}

module.exports = createYoutubeStream
