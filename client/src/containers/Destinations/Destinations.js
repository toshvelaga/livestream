import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
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

/* global gapi */

function Destinations() {
  const [twitchStreamKey, setTwitchStreamKey] = useState('')
  const [twitchAuthorizationCode, settwitchAuthorizationCode] = useState('')
  const [facebookStreamKey, setFacebookStreamKey] = useState('')
  const [buttonText, setbuttonText] = useState('Add Destination')
  let userId = getCookie('userId')

  useEffect(() => {
    let code = getUrlParams('code')
    console.log('code: ' + code)
    settwitchAuthorizationCode(code)
  }, [])

  // const handleClick = () => {
  //   const data = {
  //     twitchStreamKey,
  //     facebookStreamKey,
  //     userId,
  //   }
  //   API.put('/destinations', data)
  //     .then((response) => console.log(response))
  //     .then(() => {
  //       setbuttonText('Changes Saved!')
  //       setTimeout(() => {
  //         setbuttonText('Save')
  //       }, 1500)
  //     })
  //     .catch((err) => console.log(err))
  // }

  const youtubeAuth = () => {
    return gapi.auth2
      .getAuthInstance()
      .signIn({ scope: SCOPE })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  gapi.load('client:auth2', function () {
    gapi.auth2.init({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    })
  })

  const twitchURL = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&redirect_uri=${TWITCH_REDIRECT_URL}&response_type=code&scope=${TWITCH_SCOPE}&force_verify=true`

  console.log(twitchURL)

  const sendCodeToTwitch = () => {
    const data = {
      authorizationCode: twitchAuthorizationCode,
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
        console.log(res)
      }
    )
  }

  const sendCodeToTwitchAndValidate = async () => {
    let auth = await sendCodeToTwitch()
    console.log(auth)
    let twitchAccessToken = auth.access_token
    let twitchRefreshToken = auth.refresh_token
    setCookie('twitchAccessToken', twitchAccessToken, 1)
    setCookie('twitchRefreshToken', twitchRefreshToken, 1)
    validateTwitchRequest(twitchAccessToken)
  }

  return (
    <>
      <Navbar />
      <div className='destinations-container'>
        <h2>Destinations page</h2>

        <TextInput
          label='Facebook Stream Key (Coming Soon)'
          placeholder=''
          value={facebookStreamKey}
          onChange={(e) => setFacebookStreamKey(e.target.value)}
          disabled={true}
          errorMsg={null}
        />

        <button
          onClick={youtubeAuth}
          style={{ padding: '1rem', marginBottom: '1rem' }}
        >
          Youtube
        </button>

        <button
          // onClick={twitchAuth}
          style={{ padding: '1rem', marginBottom: '1rem', marginLeft: '1rem' }}
        >
          <a href={twitchURL}>Twitch</a>
        </button>
        <button onClick={sendCodeToTwitchAndValidate}>
          Send Code to server
        </button>

        {/* <Button style={{ width: '100%' }} title={buttonText} fx={handleClick} /> */}
      </div>
    </>
  )
}

export default Destinations
