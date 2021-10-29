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
} from '../../constants/constants'
import * as FaIcons from 'react-icons/fa'

/* global gapi */
/* global FB */

function Destinations() {
  const [twitchStreamKey, setTwitchStreamKey] = useState('')
  const [facebookStreamKey, setFacebookStreamKey] = useState('')
  const [buttonText, setbuttonText] = useState('Add Destination')
  const [destinationSelected, setdestinationSelected] = useState({
    youtube: false,
    twitch: false,
    facebook: false,
  })
  let userId = getCookie('userId')

  useEffect(() => {
    let url = window.location.href
    if (url.includes('?code')) {
      let code = getUrlParams('code')
      console.log('code: ' + code)
      twitchAuth(code)
      twitchAuthBooleanDB()
    } else {
      console.log('No code param in URL')
    }
  }, [])

  const twitchAuthBooleanDB = () => {
    let data = { twitchAuthBool: true, userId }
    API.put('/user/destinations', data)
  }

  const youtubeAuth = () => {
    return gapi.auth2
      .getAuthInstance()
      .signIn({ scope: SCOPE })
      .then((res) => {
        console.log(res)
        youtubeAuthBooleanDB()
      })
      .catch((err) => console.log(err))
  }

  const youtubeAuthBooleanDB = () => {
    let data = { youtubeAuthBool: true, userId }
    API.put('/user/destinations', data)
  }

  gapi.load('client:auth2', function () {
    gapi.auth2.init({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    })
  })

  const twitchURL = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&redirect_uri=${TWITCH_REDIRECT_URL}&response_type=code&scope=${TWITCH_SCOPE}&force_verify=true`

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
    console.log(auth)

    let twitchAccessToken = auth.access_token
    let twitchRefreshToken = auth.refresh_token

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
      <div style={{ margin: '10rem auto', width: '50%' }}>
        <h2>Added Destinations</h2>
        <div className='destinations-container'>
          <Card onClick={youtubeAuth} title={'YouTube'}>
            <FaIcons.FaYoutube color={'#ff0000'} size={50} />
          </Card>

          <a href={twitchURL}>
            <Card title={'Twitch'}>
              <FaIcons.FaTwitch color={'#9047fe'} size={50} />
            </Card>
          </a>

          <Card
            style={
              destinationSelected.facebook
                ? { backgroundColor: '#d2eefc', border: '1px solid #03a9f4' }
                : null
            }
            cardTitleStyle={
              destinationSelected.facebook ? { color: 'black' } : null
            }
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
