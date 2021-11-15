import API from '../api/api'

export const twitchAuthBooleanDB = (userId) => {
  let data = { twitchAuthBool: true, userId }
  API.put('/user/destinations', data)
}

export const sendCodeToTwitch = async (code) => {
  const data = {
    authorizationCode: code,
  }
  return await API.post('/authorize/twitch', data).then((res) => {
    return res.data
  })
}

export const validateTwitchRequest = async (twitchAccessToken) => {
  const config = {
    headers: { Authorization: `Bearer ${twitchAccessToken}` },
  }
  return await API.get('https://id.twitch.tv/oauth2/validate', config)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getTwitchStreamKey = async (
  twitchAccessToken,
  twitchClientId,
  twitchBroadcasterId
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${twitchAccessToken}`,
      'Client-Id': twitchClientId,
    },
  }
  return await API.get(
    `https://api.twitch.tv/helix/streams/key?broadcaster_id=${twitchBroadcasterId}`,
    config
  ).then((res) => {
    let twitchStreamKey = res.data.data[0].stream_key
    return twitchStreamKey
  })
}

export const saveTwitchDataToDB = (
  userId,
  twitchAccessToken,
  twitchRefreshToken,
  twitchUserID,
  twitchStreamKey
) => {
  const body = {
    userId,
    twitchAccessToken,
    twitchRefreshToken,
    twitchUserID,
    twitchStreamKey,
  }
  API.put('/destinations', body)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => console.log(err))
}
