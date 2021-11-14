import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
import Card from '../../components/Card/Card'
import API from '../../api/api'
import getCookie from '../../utils/getCookie'
import setCookie from '../../utils/setCookie'
import getUrlParams from '../../utils/getUrlParams'
import './Destinations.css'
import {
  SCOPE,
  TWITCH_SCOPE,
  TWITCH_REDIRECT_URL,
  TWITCH_RESPONSE_TYPE,
  YOUTUBE_REDIRECT_URL,
} from '../../constants/constants'
import * as FaIcons from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import styles from '../../styles/styles'

/* global FB */

function Destinations() {
  const [youtubeAccessToken, setyoutubeAccessToken] = useState('')
  const [twitchAccessToken, settwitchAccessToken] = useState('')
  const [facebookAccessToken, setfacebookAccessToken] = useState('')
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
      console.log('code: ' + code)
      twitchAuth(code)
      twitchAuthBooleanDB()
      toastSuccessMessage('Twitch added as destination')
    } else if (window.location.search.includes('&code')) {
      // logic for Youtube
      console.log('params: ' + window.location.search)
      let code = getUrlParams('code')
      console.log(code)
      API.post('/authorize/youtube', { userId, code })
      toastSuccessMessage('Youtube added as destination')
    } else {
      console.log('No code param in URL')
    }
  }, [])

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${SCOPE}&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=${YOUTUBE_REDIRECT_URL}&response_type=code&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`

  const twitchAuthBooleanDB = () => {
    let data = { twitchAuthBool: true, userId }
    API.put('/user/destinations', data)
  }

  const youtubeAuthBooleanDB = () => {
    let data = { youtubeAuthBool: true, userId }
    API.put('/user/destinations', data)
  }

  const twitchURL = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&redirect_uri=${TWITCH_REDIRECT_URL}&response_type=code&scope=${TWITCH_SCOPE}&force_verify=true`

  const toastSuccessMessage = (msg) => toast.success(msg)

  const sendCodeToTwitch = (code) => {
    const data = {
      authorizationCode: code,
    }
    return API.post('/authorize/twitch', data).then((res) => {
      return res.data
    })
  }

  const validateTwitchRequest = (token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    return API.get('https://id.twitch.tv/oauth2/validate', config).then(
      (res) => {
        return res.data
      }
    )
  }

  const getTwitchStreamKey = () => {
    let token = getCookie('twitchAccessToken')
    let broadcaster_id = getCookie('twitchUserID')

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-Id': process.env.REACT_APP_TWITCH_CLIENT_ID,
      },
    }
    return API.get(
      `https://api.twitch.tv/helix/streams/key?broadcaster_id=${broadcaster_id}`,
      config
    ).then((res) => {
      let twitchStreamKey = res.data.data[0].stream_key
      setCookie('twitchStreamKey', twitchStreamKey, 90)
      return twitchStreamKey
    })
  }

  const twitchAuth = async (code) => {
    let auth = await sendCodeToTwitch(code)
    console.log('supposed to get twitch auth data here')
    console.log(auth)

    let twitchAccessToken = auth.access_token
    console.log('twitchAccessToken: ' + twitchAccessToken)
    let twitchRefreshToken = auth.refresh_token
    console.log('twitchRefreshToken: ' + twitchRefreshToken)

    let validation = await validateTwitchRequest(twitchAccessToken)
    console.log(validation)
    let twitchUserID = validation.user_id

    setCookie('twitchAccessToken', twitchAccessToken, 1)
    setCookie('twitchRefreshToken', twitchRefreshToken, 1)
    setCookie('twitchUserID', twitchUserID, 90)

    const twitchStreamKey = await getTwitchStreamKey()

    saveTwitchDataToDB(
      userId,
      twitchAccessToken,
      twitchRefreshToken,
      twitchUserID,
      twitchStreamKey
    )
  }

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

  const facebookAuth = () => {
    FB.getLoginStatus(function (response) {
      console.log(response)
      // console.log('FB access token:' + response.authResponse.accessToken)
    })
    FB.login(
      function (response) {
        console.log(response)
        console.log('FB access token:' + response.authResponse.accessToken)
        let facebookAccessToken = response.authResponse.accessToken
        setCookie('facebookAccessToken', facebookAccessToken, 1)
        facebookAuthBooleanDB()
      },
      { scope: 'email, publish_video, public_profile', auth_type: 'rerequest' }
    )
  }

  const facebookAuthBooleanDB = () => {
    console.log('facebook: change boolean to true in database')
    let data = { facebookAuthBool: true, userId }
    API.put('/user/destinations', data)
  }

  return (
    <>
      <Navbar />
      <Toaster position='top-center' reverseOrder={true} />
      <div style={{ margin: '10rem auto', width: '50%' }}>
        <h2>Added Destinations</h2>
        <div className='destinations-container'>
          <a alt='youtube api authorization' href={googleAuthUrl}>
            <Card
              style={youtubeAccessToken ? styles.destinationSelected : null}
              cardTitleStyle={youtubeAccessToken ? styles.blackFontColor : null}
              title={'YouTube'}
            >
              <FaIcons.FaYoutube color={'#ff0000'} size={50} />
            </Card>
          </a>

          <a href={twitchURL}>
            <Card
              style={twitchAccessToken ? styles.destinationSelected : null}
              cardTitleStyle={twitchAccessToken ? styles.blackFontColor : null}
              title={'Twitch'}
            >
              <FaIcons.FaTwitch color={'#9047fe'} size={50} />
            </Card>
          </a>

          <Card
            style={facebookAccessToken ? styles.destinationSelected : null}
            cardTitleStyle={facebookAccessToken ? styles.blackFontColor : null}
            onClick={facebookAuth}
            title={'Facebook'}
          >
            <FaIcons.FaFacebook color={'#1676f2'} size={50} />
          </Card>
        </div>
      </div>
    </>
  )
}

export default Destinations
