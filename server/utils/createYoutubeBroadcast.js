const { default: axios } = require('axios')
require('dotenv').config()

const createYoutubeBroadcast = async (
  youtubeBroadcastTitle,
  youtubeBroadcastDescription,
  youtubePrivacyPolicy,
  youtubeAccessToken
) => {
  const data = {
    snippet: {
      title: youtubeBroadcastTitle,
      scheduledStartTime: `${new Date().toISOString()}`,
      description: youtubeBroadcastDescription,
    },
    contentDetails: {
      recordFromStart: true,
      enableAutoStart: true,
      monitorStream: { enableMonitorStream: false },
    },
    status: {
      privacyStatus: youtubePrivacyPolicy.value.toLowerCase(),
      selfDeclaredMadeForKids: true,
    },
  }

  const config = {
    headers: {
      Authorization: `Bearer ${youtubeAccessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  const broadcast = await axios
    .post(
      `https://youtube.googleapis.com/youtube/v3/liveBroadcasts?part=snippet%2CcontentDetails%2Cstatus%2Cid&key=${process.env.GOOGLE_API_KEY}`,
      data,
      config
    )
    .then((res) => {
      return res
    })
    .catch((err) => console.log(err))

  return broadcast
}

module.exports = createYoutubeBroadcast
