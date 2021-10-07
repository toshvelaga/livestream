import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
import API from '../../api/api'
import getCookie from '../../utils/getCookie'
import GooglePopup from '../../components/GooglePopup/GooglePopup'
import './Destinations.css'

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
        {/* <GooglePopup /> */}
        <Button style={{ width: '100%' }} title={buttonText} fx={handleClick} />
      </div>
    </>
  )
}

export default Destinations
