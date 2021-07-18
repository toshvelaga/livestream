/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'

function GooglePopup() {
  var client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID
  var redirect = encodeURIComponent('http://localhost:3000/dashboard')
  var scope = 'https://www.googleapis.com/auth/youtube'

  const url = `https://accounts.google.com/o/oauth2/auth?
    client_id=${client_id}&
    redirect_uri=${redirect}&
    scope=${scope}&
    response_type=token`

  console.log(client_id)
  return (
    <div>
      <a
        target='popup'
        onClick={() => window.open(`${url}`, 'popup', 'width=600,height=600')}
      >
        <button>Click me</button>
      </a>
    </div>
  )
}

export default GooglePopup
