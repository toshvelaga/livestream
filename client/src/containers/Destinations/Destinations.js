import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
import axios from 'axios'
import getCookie from '../../utils/getCookie'
import './Destinations.css'

function Destinations() {
  const [twitchStreamKey, setTwitchStreamKey] = useState('')
  const [youtubeStreamKey, setYoutubeStreamKey] = useState('')
  const [facebookStreamKey, setFacebookStreamKey] = useState('')
  let userId = getCookie('userId')

  useEffect(() => {
    let userId = getCookie('userId')

    axios
      .post('http://localhost:8080/api/destinations', { userId })
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
    axios
      .put('http://localhost:8080/api/destinations', data)
      .then((response) => console.log(response))
      .then(() => console.log('success'))
      .catch((err) => console.log(err))
  }

  return (
    <>
      <Navbar />
      <div className='destinations-container'>
        <h2>Destinations page</h2>
        <TextInput
          label='Twitch Stream Key'
          placeholder=''
          value={twitchStreamKey}
          onChange={(e) => setTwitchStreamKey(e.target.value)}
          errorMsg={null}
        />
        <TextInput
          label='Youtube Stream Key'
          placeholder=''
          value={youtubeStreamKey}
          onChange={(e) => setYoutubeStreamKey(e.target.value)}
          errorMsg={null}
        />
        <TextInput
          label='Facebook Stream Key'
          placeholder=''
          value={facebookStreamKey}
          onChange={(e) => setFacebookStreamKey(e.target.value)}
          errorMsg={null}
        />
        <Button style={{ width: '100%' }} title='Save' fx={handleClick} />
      </div>
    </>
  )
}

export default Destinations
