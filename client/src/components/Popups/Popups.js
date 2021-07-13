import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Popups() {
  let url = `https://id.twitch.tv/oauth2/authorize
    ?client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}
    &redirect_uri=<your registered redirect URI>
    &response_type=<type>
    &scope=<space-separated list of scopes></space-separated>`

  let url2 = `https://jsonplaceholder.typicode.com/todos/1`

  const twitchAuthUser = async () => {
    try {
      const response = await axios.get(url2)
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
