import React, { useEffect } from 'react'
import {
  TWITCH_SCOPE,
  TWITCH_REDIRECT_URL,
  TWITCH_REDIRECT_URL_BROADCASTS,
} from '../../constants/constants'
import {
  twitchAuthBooleanDB,
  sendCodeToTwitch,
  validateTwitchRequest,
  saveTwitchDataToDB,
  getTwitchStreamKey,
} from '../../utils/twitchDestinationUtils'
import getUrlParams from '../../utils/getUrlParams'
import { useHistory } from 'react-router-dom'
import getCookie from '../../utils/getCookie'
import toastSuccessMessage from '../../utils/toastSuccessMessage'
import twitch from '../../assets/twitch.svg'
import Card from '../../components/Card/Card'

const TwitchAuth = () => {
  const history = useHistory()
  let userId = getCookie('userId')

  useEffect(() => {
    let url = window.location.href
    if (url.includes('?code')) {
      // logic for Twitch
      let code = getUrlParams('code')
      console.log('twitch authorization code ' + code)
      twitchAuth(code)
      twitchAuthBooleanDB(userId)
      history.push('/destinations')
      toastSuccessMessage('Twitch added as destination')
    } else {
      console.log('No code param in URL')
    }
  }, [])

  const twitchAuth = async (code) => {
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

  const twitchURL = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&redirect_uri=${TWITCH_REDIRECT_URL_BROADCASTS}&response_type=code&scope=${TWITCH_SCOPE}&force_verify=true`

  return (
    <Card
      id='twitch-destination'
      onClick={() => (window.location.href = twitchURL)}
      //   style={twitchAccessToken ? styles.destinationSelected : null}
      //   cardTitleStyle={twitchAccessToken ? { color: '#fff' } : null}
      title={'Twitch'}
    >
      <img src={twitch} alt='twitch logo' />
    </Card>
  )
}

export default TwitchAuth
