import API from '../api/api'

const saveTwitchDataToDB = (
  userId,
  twitchAccessToken,
  twitchRefreshToken,
  twitchUserID,
  twitchStreamKey
) => {
  console.log('saveTwitchDataToDB')
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

export default saveTwitchDataToDB
