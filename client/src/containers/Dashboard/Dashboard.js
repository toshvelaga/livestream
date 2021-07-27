import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Timer from '../../components/Timer/Timer'
import formatTime from '../../utils/formatTime'
import './Dashboard.css'

const CAPTURE_OPTIONS = {
  audio: true,
  video: true,
}

function Dashboard() {
  const [mute, setMute] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const videoRef = useRef()
  const ws = useRef()
  const mediaStream = useUserMedia(CAPTURE_OPTIONS)

  let liveStream
  let liveStreamRecorder

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream
  }

  const handleCanPlay = () => {
    videoRef.current.play()
  }

  useEffect(() => {
    ws.current = new WebSocket(
      window.location.protocol.replace('http', 'ws') +
        '//' + // http: -> ws:, https: -> wss:
        'localhost:3000'
    )

    ws.current.onopen = () => {
      console.log('WebSocket Open')
    }

    return () => {
      ws.current.close()
    }
  }, [])

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

  function toggle() {
    setIsActive(!isActive)
  }

  function reset() {
    setSeconds(0)
    setIsActive(false)
  }

  const startStream = () => {
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
    liveStreamRecorder.stop()
    ws.current.close()
  }

  const toggleMute = () => {
    setMute(!mute)
  }

  const alertMessage = () => {
    alert('Ability to share screen coming soon')
  }

  return (
    <>
      <Navbar />
      <div style={{ marginTop: '5rem' }} className='main'>
        <div id='container'>
          <Timer>LIVE: {formatTime(seconds)}</Timer>
          <video
            ref={videoRef}
            onCanPlay={handleCanPlay}
            autoPlay
            playsInline
            muted={mute}
          />
        </div>
        <div className='button-container'>
          <button onClick={startStream}>Go Live</button>
          <button onClick={stopStream}>Stop Recording</button>
          <button onClick={toggle}>Share Screen</button>
          <button onClick={toggleMute}>Mute</button>
        </div>
      </div>
    </>
  )
}

const useUserMedia = (requestedMedia) => {
  const [mediaStream, setMediaStream] = useState(null)

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requestedMedia)
        setMediaStream(stream)
      } catch (err) {
        console.log(err)
      }
    }

    if (!mediaStream) {
      enableStream()
    } else {
      return function cleanup() {
        mediaStream.getVideoTracks().forEach((track) => {
          track.stop()
        })
      }
    }
  }, [mediaStream, requestedMedia])

  return mediaStream
}

export default Dashboard
