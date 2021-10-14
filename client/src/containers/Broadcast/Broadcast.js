import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import BroadcastButton from '../../components/Buttons/BroadcastButton'
import Timer from '../../components/Timer/Timer'
import formatTime from '../../utils/formatTime'
import getCookie from '../../utils/getCookie'
import API from '../../api/api'
import './Broadcast.css'
import { SCOPE, DISCOVERY } from '../../constants/constants'

const CAPTURE_OPTIONS = {
  audio: true,
  video: true,
}

/* global gapi */

function Broadcast() {
  const [isVideoOn, setisVideoOn] = useState(true)
  const [mute, setMute] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const [youtubeIngestionUrl, setYoutubeIngestionUrl] = useState('')
  const [youtubeStreamName, setYoutubeStreamName] = useState('')
  const [facebookStreamKey, setFacebookStreamKey] = useState('')
  const [twitchStreamKey, setTwitchStreamKey] = useState('')

  const [mediaStream, setMediaStream] = useState(null)
  const [userFacing, setuserFacing] = useState(false)

  const [streamId, setstreamId] = useState('')
  const [broadcastId, setbroadcastId] = useState('')

  const [auth, setAuth] = useState(null)

  const videoRef = useRef()
  const ws = useRef()

  const productionWsUrl = 'wss://www.ohmystream.xyz/websocket'
  const developmentWsUrl = 'ws://localhost:3001'

  //!!! THIS IS THE URL I AM STREAMING TO
  const youtubeUrl = youtubeIngestionUrl + '/' + youtubeStreamName

  const streamUrlParams = `?twitchStreamKey=${twitchStreamKey}&youtubeUrl=${youtubeUrl}&facebookStreamKey=${facebookStreamKey}`

  let liveStream
  let liveStreamRecorder
  let GoogleAuth

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream
  }

  async function enableStream() {
    try {
      let stream = await navigator.mediaDevices.getUserMedia({
        video: isVideoOn,
        audio: true,
      })
      setMediaStream(stream)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!mediaStream) {
      enableStream()
    } else {
      return function cleanup() {
        mediaStream.getVideoTracks().forEach((track) => {
          track.stop()
        })
      }
    }
  }, [mediaStream])

  // useEffect(() => {
  //   let userId = getCookie('userId')

  //   API.post('/destinations', { userId })
  //     .then((response) => {
  //       if (response) {
  //         setTwitchStreamKey(response.data.twitch_stream_key)
  //         setFacebookStreamKey(response.data.facebook_stream_key)
  //       }
  //     })
  //     .catch((err) => console.log(err))
  // }, [])

  useEffect(() => {
    ws.current =
      process.env.NODE_ENV === 'production'
        ? new WebSocket(productionWsUrl + streamUrlParams)
        : new WebSocket(developmentWsUrl + streamUrlParams)

    console.log(ws.current)

    ws.current.onopen = () => {
      console.log('WebSocket Open')
    }

    return () => {
      ws.current.close()
    }
  }, [twitchStreamKey, youtubeStreamName])

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1)
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, seconds])

  useEffect(() => {
    handleClientLoad()
  }, [])

  const toggle = () => {
    setIsActive(!isActive)
  }

  const startStream = () => {
    toggle()
    liveStream = videoRef.current.captureStream(30) // 30 FPS
    liveStreamRecorder = new MediaRecorder(liveStream, {
      mimeType: 'video/webm;codecs=h264',
      videoBitsPerSecond: 3 * 1024 * 1024,
    })
    liveStreamRecorder.ondataavailable = (e) => {
      ws.current.send(e.data)
      console.log('send data', e.data)
    }
    // Start recording, and dump data every second
    liveStreamRecorder.start(1000)
  }

  const stopStream = () => {
    setIsActive(false)
    ws.current.close()
    liveStreamRecorder = null
    // liveStreamRecorder.stop()
  }

  const toggleMute = () => {
    setMute(!mute)
  }

  const toggleCamera = () => {
    // toggle camera on and off here
    setisVideoOn(false)
  }

  const recordScreen = async () => {
    let stream
    !userFacing
      ? (stream = await navigator.mediaDevices.getDisplayMedia(CAPTURE_OPTIONS))
      : (stream = await navigator.mediaDevices.getUserMedia(CAPTURE_OPTIONS))
    setMediaStream(stream)

    videoRef.current.srcObject = stream
    setuserFacing(!userFacing)
  }

  const handleCanPlay = () => {
    videoRef.current.play()
  }

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
            title: `New Video: ${new Date().toISOString()}`,
            scheduledStartTime: `${new Date().toISOString()}`,
            description:
              'A description of your video stream. This field is optional.',
          },
          contentDetails: {
            recordFromStart: true,
            enableAutoStart: false,
            monitorStream: {
              enableMonitorStream: false,
            },
          },
          status: {
            privacyStatus: 'public',
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
            title: "Your new video stream's name",
            description:
              'A description of your video stream. This field is optional.',
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

  const transitionToLive = () => {
    return gapi.client.youtube.liveBroadcasts
      .transition({
        part: ['id,snippet,contentDetails,status'],
        broadcastStatus: 'live',
        id: broadcastId,
      })
      .then((res) => {
        // Handle the results here (response.result has the parsed body).
        console.log('Response', res)
      })
      .catch((err) => {
        console.log('Execute error', err)
      })
  }

  const transitionToCompleted = () => {
    return gapi.client.youtube.liveBroadcasts
      .transition({
        part: ['id,snippet,contentDetails,status'],
        broadcastStatus: 'complete',
        id: broadcastId,
      })
      .then((res) => {
        // Handle the results here (response.result has the parsed body).
        console.log('Response', res)
      })
      .catch((err) => {
        console.log('Execute error', err)
      })
  }

  return (
    <>
      <Navbar />
      <div className='dashboard-container'>
        <div id='container'>
          <div
            style={
              seconds === 0
                ? { visibility: 'hidden' }
                : { visibility: 'visible' }
            }
          >
            <Timer>
              {isActive ? 'LIVE' : 'END'}: {formatTime(seconds)}
            </Timer>
          </div>
          <video
            className='video-container'
            ref={videoRef}
            onCanPlay={handleCanPlay}
            autoPlay
            playsInline
            muted={mute}
          />
        </div>
        <div className='button-container'>
          <BroadcastButton
            title={!isActive ? 'Go Live' : 'Stop Recording'}
            fx={!isActive ? startStream : stopStream}
          />
          {/* <BroadcastButton title='Disable Camera' fx={toggleCamera} /> */}
          <BroadcastButton
            title={!userFacing ? 'Share Screen' : 'Stop Sharing'}
            fx={recordScreen}
          />
          <BroadcastButton title={!mute ? 'Mute' : 'Muted'} fx={toggleMute} />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button onClick={createBroadcast}>2. create broadcast</button>
          <button onClick={createStream}>3. create stream</button>
          <button onClick={bindBroadcastToStream}>4. bind broadcast</button>
          <button onClick={transitionToLive}>6. transition to live</button>
          <button onClick={transitionToCompleted}>
            7. transition to complete
          </button>
        </div>
      </div>
    </>
  )
}

export default Broadcast
