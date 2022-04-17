import React, { useEffect } from 'react'
import {
  TWITCH_SCOPE,
  TWITCH_REDIRECT_URL_BROADCAST,
} from '../../constants/constants'
import {
  twitchAuthBooleanDB,
  sendCodeToTwitch,
  validateTwitchRequest,
  saveTwitchDataToDB,
  getTwitchStreamKey,
} from '../../utils/twitchDestinationUtils'
import getUrlParams from '../../utils/getUrlParams'
import { useHistory } from 'react-router-dom'
import getCookie from '../../utils/getCookie'
import toastSuccessMessage from '../../utils/toastSuccessMessage'
import DisabledBroadcastAvatar from '../../components/Avatars/DisabledBroadcastAvatar'
import ReactTooltip from 'react-tooltip'
import * as FaIcons from 'react-icons/fa'

const TwitchAuth = () => {
  const twitchURL = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&redirect_uri=${TWITCH_REDIRECT_URL_BROADCAST}&response_type=code&scope=${TWITCH_SCOPE}&force_verify=true`

  return (
    <DisabledBroadcastAvatar onClick={() => (window.location.href = twitchURL)}>
      <FaIcons.FaTwitch
        data-tip='Click to Enable Twitch'
        color={'grey'}
        size={35}
      />
      <ReactTooltip className='react-tooltip' />
    </DisabledBroadcastAvatar>
  )
}

export default TwitchAuth
