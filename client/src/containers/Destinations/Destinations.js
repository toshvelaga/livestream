import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Card from '../../components/Card/Card'
import API from '../../api/api'
import getCookie from '../../utils/getCookie'
import getUrlParams from '../../utils/getUrlParams'
import {
  twitchAuthBooleanDB,
  sendCodeToTwitch,
  validateTwitchRequest,
  saveTwitchDataToDB,
  getTwitchStreamKey,
} from '../../utils/twitchDestinationUtils'
import toastSuccessMessage from '../../utils/toastSuccessMessage'
import {
  SCOPE,
  TWITCH_SCOPE,
  TWITCH_REDIRECT_URL,
  YOUTUBE_REDIRECT_URL,
} from '../../constants/constants'
import { useHistory } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import styles from '../../styles/styles'
import youtube from '../../assets/youtube.svg'
import twitch from '../../assets/twitch.svg'
import facebook from '../../assets/facebook.svg'
import './Destinations.css'

/* global gapi */
/* global FB */

function Destinations() {
  const [youtubeAccessToken, setyoutubeAccessToken] = useState('')
  const [twitchAccessToken, settwitchAccessToken] = useState('')
  const [facebookAccessToken, setfacebookAccessToken] = useState('')
  const history = useHistory()
  let userId = getCookie('userId')

  useEffect(() => {
    API.post('/destinations', { userId })
      .then((res) => {
        console.log(res)
        const {
          youtube_access_token,
          twitch_access_token,
          facebook_access_token,
        } = res.data
        setyoutubeAccessToken(youtube_access_token)
        settwitchAccessToken(twitch_access_token)
        setfacebookAccessToken(facebook_access_token)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

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
    } else if (window.location.search.includes('&code')) {
      // logic for Youtube
      let code = getUrlParams('code')
      youtubeAuth(userId, code)
      youtubeAuthBooleanDB()
      history.push('/destinations')
      toastSuccessMessage('Youtube added as destination')
    } else {
      console.log('No code param in URL')
    }
  }, [])

  const youtubeAuthClient = () => {
    return gapi.load('client:auth2', function () {
      gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      })

      gapi.auth2
        .getAuthInstance()
        .signIn({ scope: SCOPE })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => console.log(err))
    })
  }

  // const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&response_type=code&state=state_parameter_passthrough_value&scope=${SCOPE}&access_type=offline&redirect_uri=${YOUTUBE_REDIRECT_URL}&prompt=consent&include_granted_scopes=true`

  const youtubeAuth = (userId, code) => {
    API.post('/authorize/youtube', { userId, code })
  }

  const youtubeAuthBooleanDB = () => {
    let data = { youtubeAuthBool: true, userId }
    API.put('/user/destinations', data)
  }

  const twitchURL = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&redirect_uri=${TWITCH_REDIRECT_URL}&response_type=code&scope=${TWITCH_SCOPE}&force_verify=true`

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

  const facebookAuth = () => {
    FB.getLoginStatus(function (response) {
      console.log(response)
    })
    FB.login(
      function (response) {
        console.log(response)
        console.log('FB access token:' + response.authResponse.accessToken)
        let facebookAccessToken = response.authResponse.accessToken
        let facebookUserId = response.authResponse.userID

        saveFacebookDataToDB(userId, facebookAccessToken, facebookUserId)
        facebookAuthBooleanDB()
        toastSuccessMessage('Facebook added as destination')
      },
      { scope: 'email, publish_video, public_profile', auth_type: 'rerequest' }
    )
  }

  function fbLogoutUser() {
    FB.getLoginStatus(function (response) {
      if (response && response.status === 'connected') {
        FB.logout(function (response) {
          console.log(response)
          document.location.reload()
        })
      }
    })
  }

  const facebookLogout = () => {
    FB.logout(function (response) {
      console.log(response)
    })
  }

  const saveFacebookDataToDB = (
    userId,
    facebookAccessToken,
    facebookUserId
  ) => {
    API.post('/authorize/facebook', {
      userId,
      facebookAccessToken,
      facebookUserId,
    })
  }

  const removeFacebookDataFromDB = async (userId) => {
    API.post('/authorize/facebook/remove', {
      userId,
    }).then(() => {
      fbLogoutUser()
    })
  }

  const facebookAuthBooleanDB = () => {
    let data = { facebookAuthBool: true, userId }
    API.put('/user/destinations', data)
  }

  return (
    <>
      <Navbar />
      <Toaster position='top-center' reverseOrder={true} />
      <div className='destinations-outer-container'>
        <h2 className='destination-title'>Add a Destination</h2>
        <div className='destinations-container'>
          <Card
            id='youtube-destination'
            onClick={youtubeAuthClient}
            style={youtubeAccessToken ? styles.destinationSelected : null}
            cardTitleStyle={youtubeAccessToken ? { color: '#fff' } : null}
            title={'YouTube'}
          >
            <img src={youtube} alt='youtube logo' />
          </Card>

          <Card
            id='twitch-destination'
            onClick={() => (window.location.href = twitchURL)}
            style={twitchAccessToken ? styles.destinationSelected : null}
            cardTitleStyle={twitchAccessToken ? { color: '#fff' } : null}
            title={'Twitch'}
          >
            <img src={twitch} alt='twitch logo' />
          </Card>

          <Card
            id='facebook-destination'
            selected={facebookAccessToken ? true : false}
            style={facebookAccessToken ? styles.destinationSelected : null}
            cardTitleStyle={facebookAccessToken ? { color: '#fff' } : null}
            onClick={facebookAuth}
            onRemoveHandler={(event) => {
              removeFacebookDataFromDB(userId)
              event.stopPropagation()
            }}
            title={'Facebook'}
          >
            <img src={facebook} alt='facebook logo' />
          </Card>
        </div>
      </div>
    </>
  )
}

export default Destinations
