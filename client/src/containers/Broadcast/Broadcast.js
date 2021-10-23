import React, { useState, useEffect } from 'react'
import {
  YOUTUBE_PRIVACY_POLICY,
  SCOPE,
  DISCOVERY,
} from '../../constants/constants'
import API from '../../api/api'
import axios from 'axios'
import Button from '../../components/Buttons/Button'
import Selected from '../../components/Selected/Selected'
import TextInput from '../../components/TextInput/TextInput'
import TextArea from '../../components/TextArea/TextArea'
import Navbar from '../../components/Navbar/Navbar'
import Modal from 'react-modal'
import getCookie from '../../utils/getCookie'
import * as MdIcons from 'react-icons/md'
import * as FaIcons from 'react-icons/fa'
import './Broadcast.css'
import BroadcastAvatar from '../../components/Avatars/BroadcastAvatar'

Modal.defaultStyles.overlay.backgroundColor = 'rgba(45, 45, 47, 0.75)'
Modal.defaultStyles.overlay.zIndex = 101

/* global gapi */

function Broadcast() {
  const [isModalOpen, setisModalOpen] = useState(false)
  const [modalContent, setmodalContent] = useState({
    facebook: false,
    youtube: false,
    twitch: false,
  })
  const [modalContentDisplayed, setmodalContentDisplayed] = useState('')
  const [loading, setloading] = useState(false)
  const [youtubeTitle, setyoutubeTitle] = useState('')
  const [twitchTitle, settwitchTitle] = useState('')
  const [facebookTitle, setfacebookTitle] = useState('')
  // const [twitchToken, settwitchToken] = useState('')
  const [youtubeDescription, setyoutubeDescription] = useState('')
  const [facebookDescription, setfacebookDescription] = useState('')
  const [youtubePrivacyPolicy, setyoutubePrivacyPolicy] = useState('')

  const [userId, setuserId] = useState('')

  let GoogleAuth

  const closeModal = () => {
    setisModalOpen(false)
  }

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    console.log('after opening modal')
  }

  const openModal = () => {
    setisModalOpen(true)
  }

  useEffect(() => {
    let userId = getCookie('userId')
    setuserId(userId)
  }, [])

  useEffect(() => {
    handleClientLoad()
  }, [])

  function handleClientLoad() {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', initClient)
  }

  function initClient() {
    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    gapi.client
      .init({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        discoveryDocs: [DISCOVERY],
        scope: SCOPE,
      })
      .then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance()

        // Listen for sign-in state changes.
        GoogleAuth.isSignedIn.listen(updateSigninStatus)

        // Handle initial sign-in state. (Determine if user is already signed in.)
        var user = GoogleAuth.currentUser.get()
        setSigninStatus()
      })
  }

  function setSigninStatus() {
    var user = GoogleAuth.currentUser.get()
    console.log(user)
    var isAuthorized = user.hasGrantedScopes(SCOPE)
    if (isAuthorized) {
      console.log('signed in and authorized')
    } else {
      console.log('not authorized')
    }
  }

  function updateSigninStatus() {
    setSigninStatus()
  }

  //!!! createBroadcast IS CALLED SECOND. BROADCAST APPEARS ON YOUTUBE
  const createBroadcast = () => {
    return gapi.client.youtube.liveBroadcasts
      .insert({
        part: ['id,snippet,contentDetails,status'],
        resource: {
          snippet: {
            title: youtubeTitle,
            scheduledStartTime: `${new Date().toISOString()}`,
            description: youtubeDescription,
          },
          contentDetails: {
            recordFromStart: true,
            enableAutoStart: false,
            monitorStream: {
              enableMonitorStream: false,
            },
          },
          status: {
            privacyStatus: youtubePrivacyPolicy.value.toLowerCase(),
            selfDeclaredMadeForKids: true,
          },
        },
      })
      .then((res) => {
        return res.result.id
      })
  }

  //!!! CALL createStream AFTER createBroadcast. IN THE RESPONSE SET youtubeIngestionUrl AND youtubeStreamName
  const createStream = () => {
    return gapi.client.youtube.liveStreams
      .insert({
        part: ['snippet,cdn,contentDetails,status'],
        resource: {
          snippet: {
            title: youtubeTitle,
            description: youtubeDescription,
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
        return {
          streamId: res.result.id,
          youtubeDestinationUrl:
            res.result.cdn.ingestionInfo.ingestionAddress +
            '/' +
            res.result.cdn.ingestionInfo.streamName,
        }
      })
  }

  //!!! LAST FUNCTION TO BE CALLED BEFORE GOING LIVE.
  const bindBroadcastToStream = (broadcastId, streamId) => {
    return gapi.client.youtube.liveBroadcasts.bind({
      part: ['id,snippet,contentDetails,status'],
      id: broadcastId,
      streamId: streamId,
    })
  }

  const saveYoutubeDataToDB = (
    youtubeDestinationUrl,
    youtubeBroadcastId,
    streamId
  ) => {
    const data = {
      youtubeTitle,
      youtubeDescription,
      youtubePrivacyPolicy,
      userId,
      youtubeDestinationUrl,
      youtubeBroadcastId,
      streamId,
    }
    API.post('/broadcasts', data)
  }

  const youtubePromiseChain = async () => {
    try {
      const createdBroadcastId = await createBroadcast()
      const createdStream = await createStream()

      const youtubeDestinationUrl = createdStream.youtubeDestinationUrl
      const createdStreamId = createdStream.streamId

      await bindBroadcastToStream(createdBroadcastId, createdStreamId)

      saveYoutubeDataToDB(
        youtubeDestinationUrl,
        createdBroadcastId,
        createdStreamId
      )
    } catch (error) {
      console.log(error)
    }
  }

  const twitchPromiseChain = () => {
    console.log('twitch modify channel information')
    let twitchUserID = getCookie('twitchUserID')
    let twitchToken = getCookie('twitchAccessToken')

    const body = { title: twitchTitle }

    axios
      .patch(
        `https://api.twitch.tv/helix/channels?broadcaster_id=${twitchUserID}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${twitchToken}`,
            'Client-Id': process.env.REACT_APP_TWITCH_CLIENT_ID,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  const facebookPromiseChain = async () => {
    console.log('facebook authentication')

    let facebookAccessToken = getCookie('facebookAccessToken')
    const data = {
      facebookTitle,
      facebookDescription,
      facebookAccessToken,
    }
    let facebookData = await API.post('/facebook/broadcast', data).then(
      (res) => {
        return res.data
      }
    )
    console.log(facebookData)
    let facebookLiveVideoId = facebookData.id
    let facebookDestinationUrl = facebookData.secure_stream_url
    saveFacebookDataToDB(facebookLiveVideoId, facebookDestinationUrl)
  }

  const saveFacebookDataToDB = (
    facebookLiveVideoId,
    facebookDestinationUrl
  ) => {
    const data = {
      facebookTitle,
      facebookDescription,
      facebookLiveVideoId,
      facebookDestinationUrl,
    }
    API.post('/broadcasts', data).then((res) => {
      console.log(res)
    })
  }

  const modalContentDisplay = () => {
    if (modalContent.youtube === true) {
      return (
        <>
          <TextInput
            label='Title'
            placeholder=''
            value={youtubeTitle}
            onChange={(e) => setyoutubeTitle(e.target.value)}
            errorMsg={null}
          />
          <TextArea
            label='Description'
            style={{ width: '100%', marginBottom: '1rem' }}
            value={youtubeDescription}
            onChange={(e) => setyoutubeDescription(e.target.value)}
          />
          <Selected
            label='Privacy'
            options={YOUTUBE_PRIVACY_POLICY}
            onChange={(e) => {
              setyoutubePrivacyPolicy(e)
            }}
          />
        </>
      )
    } else if (modalContent.twitch === true) {
      return (
        <TextInput
          label='Title'
          placeholder=''
          value={twitchTitle}
          onChange={(e) => settwitchTitle(e.target.value)}
          errorMsg={null}
        />
      )
    } else if (modalContent.facebook === true) {
      return (
        <>
          <TextInput
            label='Title'
            placeholder=''
            value={facebookTitle}
            onChange={(e) => setfacebookTitle(e.target.value)}
            errorMsg={null}
          />
          <TextArea
            label='Description'
            style={{ width: '100%', marginBottom: '1rem' }}
            value={facebookDescription}
            onChange={(e) => setfacebookDescription(e.target.value)}
          />
        </>
      )
    }
  }

  return (
    <>
      <Navbar />
      <div className='dashboard-container'>
        <h2 style={{ marginTop: '2rem' }}>Broadcasts</h2>
        <Button fx={openModal} title='Create new Broadcast' />
      </div>
      <Modal
        className='broadcast-modal'
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel='Example Modal'
      >
        <div
          onClick={closeModal}
          className='modal-close-icon'
          style={{ float: 'right' }}
        >
          <MdIcons.MdClose color='grey' size={24} />
        </div>
        <p>Broadcast to:</p>
        <div style={{ display: 'flex', marginBottom: '1rem' }}>
          <BroadcastAvatar
            style={
              modalContent.youtube === true
                ? { border: '2px solid #03a9f4' }
                : null
            }
            onClick={() => {
              setmodalContent((prev) => ({
                ...prev,
                youtube: !prev.youtube,
              }))
              setmodalContentDisplayed('youtube')
            }}
          >
            <FaIcons.FaYoutube color={'#ff0000'} size={35} />
          </BroadcastAvatar>

          <BroadcastAvatar
            style={
              modalContent.twitch === true
                ? { border: '2px solid #03a9f4' }
                : null
            }
            onClick={() => {
              setmodalContent((prev) => ({
                ...prev,
                twitch: !prev.twitch,
              }))
              setmodalContentDisplayed('twitch')
            }}
          >
            <FaIcons.FaTwitch color={'#9047fe'} size={35} />
          </BroadcastAvatar>

          <BroadcastAvatar
            style={
              modalContent.facebook === true
                ? { border: '2px solid #03a9f4' }
                : null
            }
            onClick={() => {
              setmodalContent((prev) => ({
                ...prev,
                facebook: !prev.facebook,
              }))
              setmodalContentDisplayed('facebook')
            }}
          >
            <FaIcons.FaFacebookF color={'#1676f2'} size={35} />
          </BroadcastAvatar>
        </div>

        {modalContentDisplay()}
        <Button
          style={{ width: '100%' }}
          title='Create Broadcast'
          fx={facebookPromiseChain}
        />
      </Modal>
    </>
  )
}

export default Broadcast
