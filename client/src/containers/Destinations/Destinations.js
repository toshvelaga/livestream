import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TextInput from '../../components/TextInput/TextInput'
import './Destinations.css'

function Destinations() {
  const [twitchStreamKey, setTwitchStreamKey] = useState('')
  const [youtubeStreamKey, setYoutubeStreamKey] = useState('')
  const [facebookStreamKey, setFacebookStreamKey] = useState('')

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
      </div>
    </>
  )
}

export default Destinations
