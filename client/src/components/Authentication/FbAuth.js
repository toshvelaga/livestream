import React from 'react'
import toastSuccessMessage from '../../utils/toastSuccessMessage'
import DisabledBroadcastAvatar from '../../components/Avatars/DisabledBroadcastAvatar'
import ReactTooltip from 'react-tooltip'
import API from '../../api/api'
import getCookie from '../../utils/getCookie'
import * as FaIcons from 'react-icons/fa'

/* global FB */

const FbAuth = () => {
  let userId = getCookie('userId')

  const facebookAuth = () => {
    FB.getLoginStatus(function (response) {
      console.log(response)
    })
    FB.login(
      function (response) {
        console.log(response)
        console.log('FB access token:' + response.authResponse.accessToken)
        let facebookAccessToken = response.authResponse.accessToken
        let facebookUserId = response.authResponse.userID

        saveFacebookDataToDB(userId, facebookAccessToken, facebookUserId)
        facebookAuthBooleanDB()
        toastSuccessMessage('Facebook added as destination')
      },
      {
        scope: 'email, publish_video, public_profile',
        auth_type: 'rerequest',
      }
    )
  }

  const saveFacebookDataToDB = (
    userId,
    facebookAccessToken,
    facebookUserId
  ) => {
    API.post('/authorize/facebook', {
      userId,
      facebookAccessToken,
      facebookUserId,
    })
  }

  const facebookAuthBooleanDB = () => {
    let data = { facebookAuthBool: true, userId }
    API.put('/user/destinations', data)
  }
  return (
    <DisabledBroadcastAvatar onClick={facebookAuth}>
      <FaIcons.FaFacebookF
        data-tip='Enable Facebook in Destinations tab'
        color={'grey'}
        size={35}
      />
      <ReactTooltip className='react-tooltip' />
    </DisabledBroadcastAvatar>
  )
}

export default FbAuth
