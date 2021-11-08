import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import BroadcastButton from '../../components/Buttons/BroadcastButton'
import Timer from '../../components/Timer/Timer'
import formatTime from '../../utils/formatTime'
import getCookie from '../../utils/getCookie'
import API from '../../api/api'
import './Studio.css'
import { useParams } from 'react-router-dom'

// check out which video track is active: https://developer.mozilla.org/en-US/docs/Web/API/VideoTrack

const CAPTURE_OPTIONS = {
  audio: true,
  video: true,
}

function Studio() {
  const [youtubeUrl, setyoutubeUrl] = useState('')
  const [youtubeBroadcastId, setYoutubeBroadcastId] = useState('')
  const [youtubeAccessToken, setyoutubeAccessToken] = useState('')
  const [facebookUrl, setFacebookUrl] = useState('')
  const [facebookLiveVideoId, setfacebookLiveVideoId] = useState('')
  const [facebookAccessToken, setfacebookAccessToken] = useState('')
  const [twitchStreamKey, settwitchStreamKey] = useState('')
  const [seconds, setSeconds] = useState(0)

  const [isVideoOn, setisVideoOn] = useState(true)
  const [mute, setMute] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [mediaStream, setMediaStream] = useState(null)
  const [userFacing, setuserFacing] = useState(false)
  const [videoUrl, setvideoUrl] = useState('')
  const [chunks, setchunks] = useState([])

  const videoRef = useRef()
  const liveStreamRecorder = useRef(null)
  let liveStream

  const { id } = useParams()
  const ws = useRef()
  const productionWsUrl = 'wss://www.ohmystream.xyz/websocket'
  const developmentWsUrl = 'ws://localhost:3001'
  const streamUrlParams = `?twitchStreamKey=${twitchStreamKey}&youtubeUrl=${youtubeUrl}&facebookUrl=${encodeURIComponent(
    facebookUrl
  )}`

  useEffect(() => {
    let userId = getCookie('userId')

    API.get('/broadcasts', {
      params: {
        userId,
        studioId: id,
      },
    })
      .then((res) => {
        console.log(res)

        const {
          facebook_destination_url,
          facebook_live_video_id,
          youtube_broadcast_id,
          youtube_destination_url,
        } = res.data

        setFacebookUrl(facebook_destination_url)
        setfacebookLiveVideoId(facebook_live_video_id)
        setYoutubeBroadcastId(youtube_broadcast_id)
        setyoutubeUrl(youtube_destination_url)
      })
      .catch((err) => console.log(err))

    API.post('/destinations', { userId }).then((res) => {
      console.log(res)
      const { twitch_stream_key, facebook_access_token, youtube_access_token } =
        res.data

      settwitchStreamKey(twitch_stream_key)
      setfacebookAccessToken(facebook_access_token)
      setyoutubeAccessToken(youtube_access_token)
    })
  }, [])

  useEffect(() => {
    ws.current =
      process.env.NODE_ENV === 'production'
        ? new WebSocket(productionWsUrl + streamUrlParams)
        : new WebSocket(developmentWsUrl + streamUrlParams)

    ws.current.onopen = () => {
      console.log('WebSocket Open')
    }

    return () => {
      ws.current.close()
    }
  }, [facebookUrl, youtubeUrl, twitchStreamKey])

  const transitionYoutubeToLive = () => {
    const body = { youtubeBroadcastId, youtubeAccessToken }
    API.post('/youtube/broadcast/live', body)
  }

  const endYoutubeStream = () => {
    if (youtubeBroadcastId) {
      const body = { youtubeBroadcastId, youtubeAccessToken }
      API.post('/youtube/broadcast/end', body)
    } else return null
  }

  const endFacebookLivestream = () => {
    if (facebookLiveVideoId) {
      const data = {
        facebookLiveVideoId,
        accessToken: facebookAccessToken,
      }
      API.post('/facebook/broadcast/end', data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    } else return null
  }

  useEffect(() => {
    // seconds for the timer component
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

  // dont know what this does
  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream
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
  }, [])

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

  // toggles the stream to active or inactive
  const toggle = () => {
    setIsActive(!isActive)
  }

  const startRecording = () => {
    toggle()
    recorderInit()
    // start streaming to Youtube
    if (youtubeBroadcastId) {
      setTimeout(() => {
        transitionYoutubeToLive()
      }, 6000)
    }
  }

  const recorderInit = () => {
    liveStream = videoRef.current.captureStream(30) // 30 FPS
    liveStreamRecorder.current = new MediaRecorder(liveStream, {
      mimeType: 'video/webm;codecs=h264',
      videoBitsPerSecond: 3 * 1024 * 1024,
    })
    liveStreamRecorder.current.ondataavailable = (e) => {
      // ws.current.send(e.data)
      chunks.push(e.data)
      console.log('send data', e.data)
    }
    // Start recording, and dump data every second
    liveStreamRecorder.current.start(1000)
  }

  console.log(navigator)

  const stopRecording = () => {
    // setIsActive(false)
    // ws.current.close()
    // liveStreamRecorder.stop()
    // endYoutubeStream()
    // endFacebookLivestream()

    liveStreamRecorder.current.stop()

    const recVideoBlob = new Blob(chunks, {
      type: 'video/webm;codecs=h264',
    })
    // console.log('recVideo', recVideoBlob)
    const videoURL = window.URL.createObjectURL(recVideoBlob)
    setvideoUrl(videoURL)

    console.log(videoURL)
  }

  const toggleMute = () => {
    setMute(!mute)
  }

  const toggleRecording = async () => {
    let stream
    !userFacing
      ? (stream = await navigator.mediaDevices.getDisplayMedia(CAPTURE_OPTIONS))
      : (stream = await navigator.mediaDevices.getUserMedia(CAPTURE_OPTIONS))
    setMediaStream(stream)

    videoRef.current.srcObject = stream
    setuserFacing(!userFacing)
  }

  return (
    <>
      <Navbar />
      <div className='studio-container'>
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
            autoPlay
            playsInline
            muted={true}
          />
          {videoUrl ? <video controls src={videoUrl} /> : null}
        </div>
        <div className='studio-bottom-button-container'>
          <BroadcastButton
            id='play-button'
            title={!isActive ? 'Go Live' : 'Stop Recording'}
            fx={!isActive ? startRecording : stopRecording}
          />
          <BroadcastButton
            title={!userFacing ? 'Share Screen' : 'Stop Sharing'}
            fx={toggleRecording}
          />
          {/* <BroadcastButton title={!mute ? 'Mute' : 'Muted'} fx={toggleMute} /> */}
        </div>
      </div>
    </>
  )
}

export default Studio
