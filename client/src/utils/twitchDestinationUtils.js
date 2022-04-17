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
  twitchStreamKey,
  twitchUsername
) => {
  const body = {
    userId,
    twitchAccessToken,
    twitchRefreshToken,
    twitchUserID,
    twitchStreamKey,
    twitchUsername,
  }
  API.put('/destinations', body)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => console.log(err))
}

export const twitchAuth = async (userId, code) => {
  let auth = await sendCodeToTwitch(code)
  console.log(auth)

  let twitchAccessToken = auth.access_token
  let twitchRefreshToken = auth.refresh_token
  let validation = await validateTwitchRequest(twitchAccessToken)
  console.log(validation)

  const twitchClientId = validation.client_id
  const twitchUsername = validation.login
  const twitchUserID = validation.user_id
  const twitchStreamKey = await getTwitchStreamKey(
    twitchAccessToken,
    twitchClientId,
    twitchUserID
  )

  saveTwitchDataToDB(
    userId,
    twitchAccessToken,
    twitchRefreshToken,
    twitchUserID,
    twitchStreamKey,
    twitchUsername
  )
}
