import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
import API from '../../api/api'
import getCookie from '../../utils/getCookie'
import GooglePopup from '../../components/GooglePopup/GooglePopup'
import './Destinations.css'

/* global gapi */

function Destinations() {
  const [twitchStreamKey, setTwitchStreamKey] = useState('')
  const [youtubeStreamKey, setYoutubeStreamKey] = useState('')
  const [facebookStreamKey, setFacebookStreamKey] = useState('')
  const [buttonText, setbuttonText] = useState('Save')
  let userId = getCookie('userId')

  useEffect(() => {
    let userId = getCookie('userId')

    API.post('/destinations', { userId })
      .then((response) => {
        if (response) {
          setTwitchStreamKey(response.data.twitch_stream_key)
          setYoutubeStreamKey(response.data.youtube_stream_key)
          setFacebookStreamKey(response.data.facebook_stream_key)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  const handleClick = () => {
    const data = {
      twitchStreamKey,
      youtubeStreamKey,
      facebookStreamKey,
      userId,
    }
    API.put('/destinations', data)
      .then((response) => console.log(response))
      .then(() => {
        setbuttonText('Changes Saved!')
        setTimeout(() => {
          setbuttonText('Save')
        }, 1500)
      })
      .catch((err) => console.log(err))
  }

  const authenticate = () => {
    return gapi.auth2
      .getAuthInstance()
      .signIn({ scope: 'https://www.googleapis.com/auth/youtube.force-ssl' })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  const loadClient = () => {
    gapi.client.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY)
    return gapi.client
      .load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
      .then((res) => {
        console.log('GAPI client loaded for API')
        console.log(res)
      })
      .catch((err) => console.log('Error loading GAPI client for API', err))
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  const execute = () => {
    return gapi.client.youtube.liveStreams
      .insert({
        part: ['snippet,cdn,contentDetails,status'],
        resource: {
          snippet: {
            title: "Your new video stream's name",
            description:
              'A description of your video stream. This field is optional.',
          },
          cdn: {
            frameRate: 'variable',
            ingestionType: 'rtmp',
            resolution: 'variable',
            format: '',
          },
          contentDetails: {
            isReusable: true,
          },
        },
      })
      .then((res) => {
        // Handle the results here (response.result has the parsed body).
        console.log('Response', res)
      })
      .catch((err) => {
        console.log('Execute error', err)
      })
  }

  gapi.load('client:auth2', function () {
    gapi.auth2.init({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    })
  })

  return (
    <>
      <Navbar />
      <div className='destinations-container'>
        <h2>Destinations page</h2>
        <TextInput
          label='Twitch Stream Key (Required)'
          placeholder=''
          value={twitchStreamKey}
          onChange={(e) => setTwitchStreamKey(e.target.value)}
          errorMsg={null}
        />
        <TextInput
          label='Youtube Stream Key (Required)'
          placeholder=''
          value={youtubeStreamKey}
          onChange={(e) => setYoutubeStreamKey(e.target.value)}
          errorMsg={null}
        />
        <TextInput
          label='Facebook Stream Key (Coming Soon)'
          placeholder=''
          value={facebookStreamKey}
          onChange={(e) => setFacebookStreamKey(e.target.value)}
          disabled={true}
          errorMsg={null}
        />
        <button onClick={() => authenticate().then(loadClient)}>
          Click Me
        </button>
        <button onClick={() => execute()}>execute</button>

        <Button style={{ width: '100%' }} title={buttonText} fx={handleClick} />
      </div>
    </>
  )
}

export default Destinations
