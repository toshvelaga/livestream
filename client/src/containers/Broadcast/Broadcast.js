import React, { useState, useEffect, useRef } from 'react'
import {
  YOUTUBE_PRIVACY_POLICY,
  SCOPE,
  DISCOVERY,
} from '../../constants/constants'
import API from '../../api/api'
import Button from '../../components/Buttons/Button'
import Selected from '../../components/Selected/Selected'
import TextInput from '../../components/TextInput/TextInput'
import TextArea from '../../components/TextArea/TextArea'
import Navbar from '../../components/Navbar/Navbar'
import Modal from 'react-modal'
import getCookie from '../../utils/getCookie'
import './Broadcast.css'

Modal.defaultStyles.overlay.backgroundColor = 'rgba(45, 45, 47, 0.75)'
Modal.defaultStyles.overlay.zIndex = 101

/* global gapi */

function Broadcast() {
  const [isModalOpen, setisModalOpen] = useState(false)
  const [youtubeTitle, setyoutubeTitle] = useState('')
  const [youtubeDescription, setyoutubeDescription] = useState('')
  const [youtubePrivacyPolicy, setyoutubePrivacyPolicy] = useState('')

  const [youtubeIngestionUrl, setYoutubeIngestionUrl] = useState('')
  const [youtubeStreamName, setYoutubeStreamName] = useState('')

  const [userId, setuserId] = useState('')
  const [streamId, setstreamId] = useState('')
  const [broadcastId, setbroadcastId] = useState('')

  let youtubeDestinationUrl = youtubeIngestionUrl + '/' + youtubeStreamName
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

  console.log(youtubePrivacyPolicy)

  const submitHandler = () => {
    alert('This was clicked.')
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
            privacyStatus: youtubePrivacyPolicy,
            selfDeclaredMadeForKids: true,
          },
        },
      })
      .then((res) => {
        console.log('Response', res)
        console.log(res.result.id)
        setbroadcastId(res.result.id)
      })
      .catch((err) => {
        console.error('Execute error', err)
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
        console.log('Response', res)

        setstreamId(res.result.id)
        console.log('streamID' + res.result.id)

        setYoutubeIngestionUrl(res.result.cdn.ingestionInfo.ingestionAddress)
        console.log(res.result.cdn.ingestionInfo.ingestionAddress)

        setYoutubeStreamName(res.result.cdn.ingestionInfo.streamName)
        console.log(res.result.cdn.ingestionInfo.streamName)
      })
      .catch((err) => {
        console.log('Execute error', err)
      })
  }

  //!!! LAST FUNCTION TO BE CALLED BEFORE GOING LIVE.
  const bindBroadcastToStream = () => {
    return gapi.client.youtube.liveBroadcasts
      .bind({
        part: ['id,snippet,contentDetails,status'],
        id: broadcastId,
        streamId: streamId,
      })
      .then((res) => {
        console.log('Response', res)
      })
      .catch((err) => {
        console.error('Execute error', err)
      })
  }

  const saveYoutubeDataToDB = () => {
    const data = {
      youtubeTitle,
      youtubeDescription,
      youtubePrivacyPolicy,
      // timeCreated,
      youtubeDestinationUrl,
      userId,
      broadcastId,
      streamId,
    }
    API.put('/broadcasts', data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
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
        <p>Broadcast to:</p>
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
          onChange={(e) => setyoutubePrivacyPolicy(e)}
        />
        <Button
          style={{ width: '100%' }}
          title='Create Broadcast'
          fx={submitHandler}
        />
      </Modal>
    </>
  )
}

export default Broadcast
