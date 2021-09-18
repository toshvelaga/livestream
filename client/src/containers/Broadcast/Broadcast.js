import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import BroadcastButton from '../../components/Buttons/BroadcastButton'
import Timer from '../../components/Timer/Timer'
import formatTime from '../../utils/formatTime'
import getCookie from '../../utils/getCookie'
import API from '../../api/api'
import './Broadcast.css'

const CAPTURE_OPTIONS = {
  audio: true,
  video: true,
}

function Broadcast() {
  const [isVideoOn, setisVideoOn] = useState(true)
  const [mute, setMute] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const [twitchStreamKey, setTwitchStreamKey] = useState('')
  const [youtubeStreamKey, setYoutubeStreamKey] = useState('')
  const [facebookStreamKey, setFacebookStreamKey] = useState('')

  const [mediaStream, setMediaStream] = useState(null)
  const [userFacing, setuserFacing] = useState(false)

  const videoRef = useRef()
  const ws = useRef()

  let liveStream
  let liveStreamRecorder

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

  useEffect(() => {
    let userId = getCookie('userId')

    API.post('/destinations', { userId })
      .then((response) => {
        if (response) {
          setTwitchStreamKey(response.data.twitch_stream_key)
          setYoutubeStreamKey(response.data.youtube_stream_key)
          setFacebookStreamKey(response.data.facebook_stream_key)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    ws.current =
      process.env.NODE_ENV === 'production'
        ? new WebSocket(
            // 'wss://www.ohmystream.co/websocket'
            // +
            //   `?twitchStreamKey=${twitchStreamKey}&youtubeStreamKey=${youtubeStreamKey}&facebookStreamKey=${facebookStreamKey}`
            'wss://www.ohmystream.co/websocket' +
              `?twitchStreamKey=${twitchStreamKey}&youtubeStreamKey=${youtubeStreamKey}&facebookStreamKey=${facebookStreamKey}`
          )
        : new WebSocket(
            `ws://localhost:8080` +
              `?twitchStreamKey=${twitchStreamKey}&youtubeStreamKey=${youtubeStreamKey}&facebookStreamKey=${facebookStreamKey}`
          )

    console.log(ws.current)

    ws.current.onopen = () => {
      console.log('WebSocket Open')
    }

    return () => {
      ws.current.close()
    }
  }, [twitchStreamKey, youtubeStreamKey])

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

  const toggle = () => {
    setIsActive(!isActive)
  }

  const startStream = () => {
    if (!twitchStreamKey || !youtubeStreamKey) {
      alert(
        'Please add your twitch and youtube stream keys first under destinations'
      )
    } else {
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
      </div>
    </>
  )
}

export default Broadcast
