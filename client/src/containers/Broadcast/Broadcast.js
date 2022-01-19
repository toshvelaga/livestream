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
import BroadcastAvatar from '../../components/Avatars/BroadcastAvatar'
import NoDestinationsMessage from '../../components/Messages/NoDestinationsMessage'
import * as MdIcons from 'react-icons/md'
import * as FaIcons from 'react-icons/fa'
import RTMP from '../../assets/RTMP.png'
import './Broadcast.css'
import styles from '../../styles/styles'
import { useHistory } from 'react-router-dom'

Modal.defaultStyles.overlay.backgroundColor = 'rgba(45, 45, 47, 0.75)'
Modal.defaultStyles.overlay.zIndex = 101
Modal.setAppElement('#root')

/* global gapi */

function Broadcast() {
  const [isModalOpen, setisModalOpen] = useState(false)
  const [modalContent, setmodalContent] = useState({
    facebook: false,
    youtube: false,
    twitch: false,
    customRTMP: false,
  })
  const [showBroadcastAvatar, setshowBroadcastAvatar] = useState({
    facebook: false,
    youtube: false,
    twitch: false,
    customRTMP: true,
  })
  const [modalContentDisplayed, setmodalContentDisplayed] = useState('')
  const [loading, setloading] = useState(false)
  const [youtubeTitle, setyoutubeTitle] = useState('')
  const [twitchTitle, settwitchTitle] = useState('')
  const [facebookTitle, setfacebookTitle] = useState('')
  const [youtubeDescription, setyoutubeDescription] = useState('')
  const [facebookDescription, setfacebookDescription] = useState('')
  const [youtubePrivacyPolicy, setyoutubePrivacyPolicy] = useState({
    value: 'Public',
    label: 'Public',
  })

  const [userId, setuserId] = useState(getCookie('userId'))

  const [youtubeTitleError, setyoutubeTitleError] = useState('')
  const [facebookTitleError, setfacebookTitleError] = useState('')
  const [facebookDescriptionError, setfacebookDescriptionError] = useState('')
  const [noSelectedDestinationError, setnoSelectedDestinationError] =
    useState(false)

  const [twitchUserId, settwitchUserId] = useState('')
  const [twitchAccessToken, settwitchAccessToken] = useState('')
  const [twitchAccessRefreshToken, settwitchAccessRefreshToken] = useState('')
  const [twitchStreamKey, settwitchStreamKey] = useState('')
  const [facebookUserId, setfacebookUserId] = useState('')
  const [facebookAccessToken, setfacebookAccessToken] = useState('')
  const [longFacebookAccessToken, setlongFacebookAccessToken] = useState('')

  // for custom RTMP server
  const [customRtmpServer, setcustomRtmpServer] = useState('')
  const [customRtmpStreamKey, setcustomRtmpStreamKey] = useState('')
  const [customRtmpServerError, setcustomRtmpServerError] = useState('')

  let history = useHistory()
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
    const body = { userId }
    // api call to show broadcast avatar
    API.post('/user/destinations', body)
      .then((res) => {
        console.log(res)
        setshowBroadcastAvatar({
          facebook: res.data.facebook_auth,
          youtube: res.data.youtube_auth,
          twitch: res.data.twitch_auth,
          customRTMP: true,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    const body = { userId }
    // api call to get twitch data
    API.post('/destinations', body)
      .then((res) => {
        console.log(res)
        const {
          twitch_user_id,
          twitch_access_token,
          twitch_refresh_token,
          twitch_stream_key,
          facebook_user_id,
          facebook_access_token,
          facebook_long_access_token,
        } = res.data

        settwitchUserId(twitch_user_id)
        settwitchStreamKey(twitch_stream_key)
        setfacebookUserId(facebook_user_id)
        setfacebookAccessToken(facebook_access_token)
        setlongFacebookAccessToken(facebook_long_access_token)

        let config = {
          headers: {
            Authorization: `Bearer ${twitch_access_token}`,
          },
        }

        // validate twitch token
        axios
          .get('https://id.twitch.tv/oauth2/validate', config)
          .then((res) => {
            console.log(res)
            settwitchAccessToken(twitch_access_token)
            settwitchAccessRefreshToken(twitch_refresh_token)
          })
          .catch((err) => {
            console.log(err.response)
            if (err.response.status === 401) {
              console.log('the token is fucked up')
              API.post('/authorize/twitch/refresh', {
                userId,
                refreshToken: twitch_refresh_token,
              }).then((res) => {
                console.log(res)
                settwitchAccessToken(res.data.access_token)
                settwitchAccessRefreshToken(res.data.refresh_token)
              })
            }
          })
      })
      .catch((err) => {
        console.log(err)
      })
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
        console.log('user' + JSON.stringify(user))
        if (!user) {
          setSigninStatus()
        }
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
  const createBroadcast = async () => {
    let broadcastId
    await gapi.client.youtube.liveBroadcasts
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
            // startWithSlate: true,
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
        broadcastId = res.result.id
      })
      .catch((err) => {
        console.error('Execute error', err)
      })
    return broadcastId
  }

  //!!! CALL createStream AFTER createBroadcast. IN THE RESPONSE SET youtubeIngestionUrl AND youtubeStreamName
  const createStream = async () => {
    let streamId
    let youtubeDestinationUrl

    await gapi.client.youtube.liveStreams
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
        streamId = res.result.id
        youtubeDestinationUrl =
          res.result.cdn.ingestionInfo.ingestionAddress +
          '/' +
          res.result.cdn.ingestionInfo.streamName
      })
      .catch((err) => {
        console.log('Execute error', err)
      })
    return { streamId, youtubeDestinationUrl }
  }

  //!!! CALL AFTER CREATING STREAM.
  const bindBroadcastToStream = async (youtubeBroadcastId, youtubeStreamId) => {
    return gapi.client.youtube.liveBroadcasts
      .bind({
        part: ['id,snippet,contentDetails,status'],
        id: youtubeBroadcastId,
        streamId: youtubeStreamId,
      })
      .then((res) => {
        console.log('Response', res)
      })
      .catch((err) => {
        console.error('Execute error', err)
      })
  }

  const youtubePromiseChain = async () => {
    try {
      if (modalContent.youtube) {
        console.log('youtube promise chain')

        const broadcastId = await createBroadcast()
        const stream = await createStream()
        bindBroadcastToStream(broadcastId, stream.streamId)

        return {
          youtubeBroadcastId: broadcastId,
          youtubeStreamId: stream.streamId,
          youtubeDestinationUrl: stream.youtubeDestinationUrl,
        }
      } else
        return {
          youtubeBroadcastId: '',
          youtubeStreamId: '',
          youtubeDestinationUrl: '',
        }
    } catch (error) {
      console.log(error)
    }
  }

  const twitchPromiseChain = () => {
    if (modalContent.twitch) {
      console.log('twitch promise chain')

      const body = {
        userId,
        twitchUserId,
        twitchAccessToken,
        twitchAccessRefreshToken,
        title: twitchTitle,
      }

      API.patch('/twitch/broadcast', body)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => console.log(err.response))
      return {
        twitchTitle: twitchTitle,
        twitchStreamKey: twitchStreamKey,
      }
    } else return { twitchTitle: '', twitchStreamKey: null }
    // HAVE TO SET TWITCH STREAM KEY TO NULL for server.js
  }

  const facebookPromiseChain = async () => {
    if (modalContent.facebook) {
      console.log('facebook promise chain')

      const data = {
        facebookUserId,
        facebookTitle,
        facebookDescription,
        facebookAccessToken,
        longFacebookAccessToken,
      }
      let facebookData = await API.post('/facebook/broadcast', data).then(
        (res) => {
          console.log(res.data)
          return res.data
        }
      )
      console.log(facebookData)
      let facebookLiveVideoId = facebookData.id
      let facebookDestinationUrl = facebookData.secure_stream_url

      return {
        facebookLiveVideoId: facebookLiveVideoId,
        facebookDestinationUrl: facebookDestinationUrl,
      }
    } else return { facebookLiveVideoId: '', facebookDestinationUrl: '' }
  }

  const sendDataToDB = (
    youtubeDestinationUrl,
    youtubeBroadcastId,
    youtubeStreamId,
    facebookLiveVideoId,
    facebookDestinationUrl,
    twitchTitle,
    twitchStreamKey,
    customServer,
    customStreamKey
  ) => {
    const data = {
      youtubeTitle,
      youtubeDescription,
      youtubePrivacyPolicy,
      userId,
      youtubeDestinationUrl,
      youtubeBroadcastId,
      youtubeStreamId,
      facebookTitle,
      facebookDescription,
      facebookLiveVideoId,
      facebookDestinationUrl,
      twitchTitle,
      twitchStreamKey,
      customServer,
      customStreamKey,
    }
    API.post('/broadcasts', data).then((res) => {
      if (res.data.studio_id) {
        console.log(res.data.studio_id)
        let studioId = res.data.studio_id
        history.push(`/studio/${studioId}`)
      }
    })
  }

  const submit = () => {
    if (
      !modalContent.youtube &&
      !modalContent.twitch &&
      !modalContent.facebook &&
      !modalContent.customRTMP
    ) {
      setnoSelectedDestinationError(true)
      setTimeout(() => {
        setnoSelectedDestinationError(false)
      }, 3000)
      return
    }

    if (modalContent.youtube && !youtubeTitle) {
      setyoutubeTitleError('Please enter a Youtube title')
      return
    }
    if (modalContent.facebook && !facebookTitle) {
      setfacebookTitleError('Please enter a Facebook title')
      return
    }
    if (modalContent.facebook && !facebookDescription) {
      setfacebookDescriptionError('Please enter a Facebook description')
      return
    }
    if (modalContent.customRTMP && !customRtmpServer) {
      setcustomRtmpServerError('Please enter a custom RTMP server')
      return
    } else {
      return allPromises()
    }
  }

  const allPromises = () => {
    setloading(true)
    Promise.all([
      youtubePromiseChain(),
      twitchPromiseChain(),
      facebookPromiseChain(),
    ]).then((values) => {
      const flatObj = Object.assign({}, ...values)
      const {
        youtubeDestinationUrl,
        youtubeBroadcastId,
        youtubeStreamId,
        facebookLiveVideoId,
        facebookDestinationUrl,
        twitchTitle,
        twitchStreamKey,
      } = flatObj
      sendDataToDB(
        youtubeDestinationUrl,
        youtubeBroadcastId,
        youtubeStreamId,
        facebookLiveVideoId,
        facebookDestinationUrl,
        twitchTitle,
        twitchStreamKey
      )
    })
  }

  const modalContentDisplay = () => {
    if (modalContent.youtube === true && modalContentDisplayed === 'youtube') {
      return (
        <>
          <TextInput
            label='Title'
            placeholder=''
            value={youtubeTitle}
            onChange={(e) => {
              setyoutubeTitle(e.target.value)
              if (youtubeTitleError) {
                setyoutubeTitleError('')
              }
            }}
            errorMsg={youtubeTitleError ? youtubeTitleError : null}
          />
          <TextArea
            label={
              <span>
                Description <i style={{ color: '#ccc' }}>(Optional)</i>
              </span>
            }
            value={youtubeDescription}
            onChange={(e) => setyoutubeDescription(e.target.value)}
          />
          <Selected
            label='Privacy'
            options={YOUTUBE_PRIVACY_POLICY}
            value={youtubePrivacyPolicy}
            onChange={(e) => {
              setyoutubePrivacyPolicy(e)
            }}
          />
        </>
      )
    } else if (
      modalContent.twitch === true &&
      modalContentDisplayed === 'twitch'
    ) {
      return (
        <TextInput
          label='Title'
          placeholder=''
          value={twitchTitle}
          onChange={(e) => settwitchTitle(e.target.value)}
          errorMsg={null}
        />
      )
    } else if (
      modalContent.facebook === true &&
      modalContentDisplayed === 'facebook'
    ) {
      return (
        <>
          <TextInput
            label='Title'
            placeholder=''
            value={facebookTitle}
            onChange={(e) => {
              setfacebookTitle(e.target.value)
              if (facebookTitleError) {
                setfacebookTitleError('')
              }
            }}
            errorMsg={facebookTitleError ? facebookTitleError : null}
          />
          <TextArea
            label='Description'
            value={facebookDescription}
            onChange={(e) => {
              setfacebookDescription(e.target.value)
              if (facebookDescriptionError) {
                setfacebookDescriptionError('')
              }
            }}
            errorMsg={
              facebookDescriptionError ? facebookDescriptionError : null
            }
          />
        </>
      )
    } else if (
      modalContent.customRTMP === true &&
      modalContentDisplayed === 'customRTMP'
    ) {
      return (
        <>
          {/* <p>Custom RTMP destination</p> */}
          <TextInput
            label='Server'
            placeholder=''
            value={customRtmpServer}
            onChange={(e) => {
              setcustomRtmpServer(e.target.value)
              if (customRtmpServerError) {
                setcustomRtmpServerError('')
              }
            }}
            errorMsg={customRtmpServerError ? customRtmpServerError : null}
          />
          <TextInput
            label='Stream Key'
            placeholder=''
            value={customRtmpStreamKey}
            onChange={(e) => setcustomRtmpStreamKey(e.target.value)}
            errorMsg={null}
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
        <Button fx={openModal} title='Create new broadcast' />
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
          {!showBroadcastAvatar.youtube &&
          !showBroadcastAvatar.twitch &&
          !showBroadcastAvatar.facebook ? (
            <NoDestinationsMessage />
          ) : null}
          {showBroadcastAvatar.youtube ? (
            <BroadcastAvatar
              style={
                modalContent.youtube === true
                  ? { border: styles.broadcastAvatarBorder }
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
          ) : null}

          {showBroadcastAvatar.twitch ? (
            <BroadcastAvatar
              style={
                modalContent.twitch === true
                  ? { border: styles.broadcastAvatarBorder }
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
          ) : null}

          {showBroadcastAvatar.facebook ? (
            <BroadcastAvatar
              style={
                modalContent.facebook === true
                  ? { border: styles.broadcastAvatarBorder }
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
          ) : null}

          {/* CUSTOM RTMP SERVER AND STREAM KEY */}
          {showBroadcastAvatar.customRTMP ? (
            <BroadcastAvatar
              style={
                modalContent.customRTMP === true
                  ? { border: styles.broadcastAvatarBorder }
                  : null
              }
              onClick={() => {
                setmodalContent((prev) => ({
                  ...prev,
                  customRTMP: !prev.customRTMP,
                }))
                setmodalContentDisplayed('customRTMP')
              }}
            >
              <img
                src={RTMP}
                alt='custom RTMP destination'
                style={{ height: '50px' }}
              />
            </BroadcastAvatar>
          ) : null}
        </div>
        {noSelectedDestinationError && (
          <p style={{ color: 'red' }}>
            Please select at least one platform to broadcast on.
          </p>
        )}

        {modalContentDisplay()}
        <Button
          disabled={loading}
          loading={loading}
          style={{ width: '100%' }}
          title='Create Broadcast'
          fx={submit}
        />
      </Modal>
    </>
  )
}

export default Broadcast
