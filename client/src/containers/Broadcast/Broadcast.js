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
  })
  const [showBroadcastAvatar, setshowBroadcastAvatar] = useState({
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
  const [youtubePrivacyPolicy, setyoutubePrivacyPolicy] = useState({
    value: 'Public',
    label: 'Public',
  })

  const [userId, setuserId] = useState('')

  const [youtubeTitleError, setyoutubeTitleError] = useState('')
  const [facebookTitleError, setfacebookTitleError] = useState('')
  const [facebookDescriptionError, setfacebookDescriptionError] = useState('')

  const [twitchUserId, settwitchUserId] = useState('')
  const [twitchAccessToken, settwitchAccessToken] = useState('')
  const [twitchAccessRefreshToken, settwitchAccessRefreshToken] = useState('')
  const [facebookAccessToken, setfacebookAccessToken] = useState('')
  const [youtubeAccessToken, setyoutubeAccessToken] = useState('')
  const [youtubeAccessRefreshToken, setyoutubeAccessRefreshToken] = useState('')

  let GoogleAuth
  let history = useHistory()

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

    const body = { userId }
    // api call to show broadcast avatar
    API.post('/user/destinations', body)
      .then((res) => {
        console.log(res)
        setshowBroadcastAvatar({
          facebook: res.data.facebook_auth,
          youtube: res.data.youtube_auth,
          twitch: res.data.twitch_auth,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    let userId = getCookie('userId')
    setuserId(userId)

    const body = { userId }
    // api call to get twitch data
    API.post('/destinations', body)
      .then((res) => {
        console.log(res)
        const {
          twitch_user_id,
          twitch_access_token,
          twitch_refresh_token,
          facebook_access_token,
          youtube_access_token,
          youtube_refresh_token,
        } = res.data

        settwitchUserId(twitch_user_id)

        let config = {
          headers: {
            Authorization: `Bearer ${twitch_access_token}`,
          },
        }

        // validate google token
        axios
          .get(
            `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${youtube_access_token}`
          )
          .then((res) => {
            console.log(res)
            console.log('google access token expires in ' + res.data.expires_in)
            setyoutubeAccessToken(youtube_access_token)
          })
          .catch((err) => {
            console.log(err)
          })

        // validate twitch token
        axios
          .get('https://id.twitch.tv/oauth2/validate', config)
          .then((res) => {
            console.log(res)
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

  console.log('twitchAccessToken ' + twitchAccessToken)
  console.log('twitchAccessRefreshToken ' + twitchAccessRefreshToken)
  console.log('twitch user id ' + twitchUserId)

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

  const youtubePromiseChain = async () => {
    try {
      if (modalContent.youtube) {
        console.log('youtube promise chain')
        const createdBroadcastId = await createBroadcast()
        const createdStream = await createStream()

        const youtubeDestinationUrl = createdStream.youtubeDestinationUrl
        const createdStreamId = createdStream.streamId

        await bindBroadcastToStream(createdBroadcastId, createdStreamId)

        return {
          youtubeDestinationUrl: youtubeDestinationUrl,
          youtubeBroadcastId: createdBroadcastId,
          youtubeStreamId: createdStreamId,
        }
      } else
        return {
          youtubeDestinationUrl: '',
          youtubeBroadcastId: '',
          youtubeStreamId: '',
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
      }
    } else return { twitchTitle: '' }
  }

  const facebookPromiseChain = async () => {
    if (modalContent.facebook) {
      console.log('facebook promise chain')

      let facebookAccessToken = getCookie('facebookAccessToken')
      const data = {
        facebookTitle,
        facebookDescription,
        facebookAccessToken,
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
    twitchTitle
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
    }
    API.post('/broadcasts', data).then((res) => {
      if (res.data.studio_id) {
        console.log(res.data.studio_id)
        let studioId = res.data.studio_id
        // history.push(`/studio/${studioId}`)
      }
    })
  }

  const submit = () => {
    try {
      setloading(true)

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
      } else {
        return allPromises()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setloading(false)
    }
  }

  const allPromises = () => {
    Promise.all([
      youtubePromiseChain(),
      twitchPromiseChain(),
      facebookPromiseChain(),
    ]).then((values) => {
      const flatObj = Object.assign({}, ...values)
      sendDataToDB(
        flatObj.youtubeDestinationUrl,
        flatObj.youtubeBroadcastId,
        flatObj.youtubeStreamId,
        flatObj.facebookLiveVideoId,
        flatObj.facebookDestinationUrl,
        flatObj.twitchTitle
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
        </div>

        {modalContentDisplay()}
        <Button
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
