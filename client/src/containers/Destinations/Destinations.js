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
  DISCOVERY,
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
  let GoogleAuth

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

  useEffect(() => {
    handleClientLoad()
  }, [])

  function handleClientLoad() {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', initClient)
  }

  function initClient() {
    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    gapi.client
      .init({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        discoveryDocs: [DISCOVERY],
        scope: SCOPE,
      })
      .then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance()
        console.log('GoogleAuth: ', JSON.stringify(GoogleAuth))

        // Listen for sign-in state changes.
        // GoogleAuth.isSignedIn.listen(updateSigninStatus)

        // Handle initial sign-in state. (Determine if user is already signed in.)
        // var user = GoogleAuth.currentUser.get()
        // console.log('user' + JSON.stringify(user))
        // if (!user) {
        //   setSigninStatus()
        // }
      })
  }

  // function setSigninStatus() {
  //   var user = GoogleAuth.currentUser.get()
  //   console.log(user)
  //   var isAuthorized = user.hasGrantedScopes(SCOPE)
  //   if (isAuthorized) {
  //     console.log('signed in and authorized')
  //   } else {
  //     console.log('not authorized')
  //   }
  // }

  // function updateSigninStatus() {
  //   setSigninStatus()
  // }

  const youtubeAuthClient = () => {
    return gapi.auth2
      .getAuthInstance()
      .signIn({ scope: SCOPE })
      .then((res) => {
        console.log(res.wc.access_token)
        let youtubeAccessToken = res.wc.access_token
        youtubeSaveAccessTokenToDB(userId, youtubeAccessToken)
        youtubeAuthBooleanDB()
        toastSuccessMessage('Youtube added as destination')
      })
      .catch((err) => console.log(err))
  }

  // const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&response_type=code&state=state_parameter_passthrough_value&scope=${SCOPE}&access_type=offline&redirect_uri=${YOUTUBE_REDIRECT_URL}&prompt=consent&include_granted_scopes=true`

  const youtubeAuth = (userId, code) => {
    API.post('/authorize/youtube', { userId, code })
  }

  const youtubeAuthBooleanDB = () => {
    let data = { youtubeAuthBool: true, userId }
    API.put('/user/destinations', data)
  }

  const youtubeSaveAccessTokenToDB = (userId, youtubeAccessToken) => {
    let data = { userId, youtubeAccessToken }
    API.put('/destinations/youtube', data)
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
