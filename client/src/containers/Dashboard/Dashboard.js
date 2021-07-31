import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TopNavbar from '../../components/Navbar/TopNavbar'
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

  useEffect(() => {
    ws.current = new WebSocket(
      window.location.protocol.replace('http', 'ws') +
        '//' + // http: -> ws:, https: -> wss:
        'localhost:3001'
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

  const alertMessage = () => {
    alert('Ability to share screen coming soon')
  }

  const handleCanPlay = () => {
    videoRef.current.play()
  }

  return (
    <>
      <Navbar />
      <div className='dashboard-container'>
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
          <button onClick={alertMessage}>Share Screen</button>
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
