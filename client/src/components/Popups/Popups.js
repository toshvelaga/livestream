import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Popups() {
  const CLIENT_ID = encodeURIComponent(process.env.REACT_APP_TWITCH_CLIENT_ID)
  const REDIRECT_URI = encodeURIComponent('http://localhost:3000/')
  const RESPONSE_TYPE = encodeURIComponent('token id_token')
  const SCOPE = encodeURIComponent('openid')

  let url = `https://id.twitch.tv/oauth2/authorize
    ?client_id=${CLIENT_ID}
    &redirect_uri=${REDIRECT_URI}
    &response_type=${RESPONSE_TYPE}
    &scope=${SCOPE}`

  let url2 = `https://jsonplaceholder.typicode.com/todos/1`

  const twitchAuthUser = async () => {
    try {
      const response = await axios.get(url)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    twitchAuthUser()
  }, [])
  return (
    <div>
      <button onClick={() => alert('clicked')}>Click Me</button>
    </div>
  )
}

export default Popups
