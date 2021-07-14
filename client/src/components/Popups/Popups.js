import React, { useState, useEffect } from 'react'

function Popups() {
  useEffect(() => {
    var client_id = process.env.REACT_APP_TWITCH_CLIENT_ID
    var redirect = 'http://localhost:3000/'
    var scope = encodeURIComponent(
      'user:read:email user:read:follows user:read:broadcast channel:manage:schedule channel:read:stream_key'
    )

    document
      .getElementById('authorize_public')
      .setAttribute(
        'href',
        'https://id.twitch.tv/oauth2/authorize?client_id=' +
          client_id +
          '&redirect_uri=' +
          encodeURIComponent(redirect) +
          '&response_type=token'
      )
    document
      .getElementById('authorize_email')
      .setAttribute(
        'href',
        'https://id.twitch.tv/oauth2/authorize?client_id=' +
          client_id +
          '&redirect_uri=' +
          encodeURIComponent(redirect) +
          `&response_type=token&scope=${scope}`
      )
    document.getElementById('access_token').textContent = ''

    if (document.location.hash && document.location.hash != '') {
      var parsedHash = new URLSearchParams(window.location.hash.substr(1))
      if (parsedHash.get('access_token')) {
        var access_token = parsedHash.get('access_token')
        document.getElementById('access_token').textContent =
          'Your Access Key from the #url: ' + access_token

        document.getElementById('user_data').textContent = 'Loading'

        // call API
        fetch('https://api.twitch.tv/helix/users', {
          headers: {
            'Client-ID': client_id,
            Authorization: 'Bearer ' + access_token,
          },
        })
          .then((resp) => resp.json())
          .then((resp) => {
            console.log(resp.data)
            document.getElementById('user_data').innerHTML =
              '<p>Your Public Twitch Profile from Helix:</p>'
            var table = document.createElement('table')
            document.getElementById('user_data').append(table)
            for (var key in resp.data[0]) {
              var tr = document.createElement('tr')
              table.append(tr)
              var td = document.createElement('td')
              td.textContent = key
              tr.append(td)
              var td = document.createElement('td')
              td.textContent = resp.data[0][key]
              tr.append(td)
            }
          })
          .catch((err) => {
            console.log(err)
            document.getElementById('user_data').textContent =
              'Something went wrong'
          })
      }
    } else if (document.location.search && document.location.search != '') {
      var parsedParams = new URLSearchParams(window.location.search)
      if (parsedParams.get('error_description')) {
        document.getElementById('access_token').textContent =
          parsedParams.get('error') +
          ' - ' +
          parsedParams.get('error_description')
      }
    }
  }, [])

  return (
    <div>
      <p>
        <a
          href='https://dev.twitch.tv/docs/authentication/getting-tokens-oauth#oauth-implicit-code-flow'
          target='_blank'
        >
          Implicit Auth
        </a>
        is a way to get a
        <a
          href='https://dev.twitch.tv/docs/authentication#types-of-tokens'
          target='_blank'
        >
          User Access Token
        </a>
        in a pure front end environment, it needs only a ClientID
      </p>
      <p>
        Get the code for this example on{' '}
        <a href='https://github.com/BarryCarlyon/twitch_misc/tree/main/authentication/implicit_auth'>
          Github
        </a>{' '}
        or just View the source instead
      </p>
      <ul>
        <li>
          <a
            target='popup'
            onClick={() =>
              window.open(
                'http://kanishkkunal.com',
                'popup',
                'width=600,height=600'
              )
            }
            id='authorize_public'
          >
            Authorize and get Public data
          </a>
        </li>
        <li>
          <a href='' id='authorize_email'>
            Authorize and get public data + email
          </a>
        </li>
      </ul>
      <p>
        After testing you can Disconnect the "Barry's GitHub Examples"
        Application on the{' '}
        <a href='https://www.twitch.tv/settings/connections'>
          Connections page
        </a>
      </p>
      <div id='access_token'></div>
      <div id='user_data'></div>

      <button onClick={() => alert('clicked')}>Click Me</button>
    </div>
  )
}

export default Popups
