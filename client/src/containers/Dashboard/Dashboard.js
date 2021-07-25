import React, { useState, useEffect, useRef, createRef } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Dashboard.css'

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: 'environment' },
}

function Dashboard() {
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

  return (
    <>
      <Navbar />
      <div style={{ marginTop: '5rem' }} className='main'>
        <div id='container'>
          <video
            ref={videoRef}
            onCanPlay={handleCanPlay}
            autoPlay
            playsInline
            muted
          />
          {/* <Canvas videoRef={videoRef} /> */}
        </div>
        <div className='button-container'>
          <button onClick={startStream}>Go Live</button>
          <button onClick={stopStream}>Stop Recording</button>
          <button>Share Screen</button>
          <button>Mute</button>
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
        // Removed for brevity
      }
    }

    if (!mediaStream) {
      enableStream()
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach((track) => {
          track.stop()
        })
      }
    }
  }, [mediaStream, requestedMedia])

  return mediaStream
}

const useDisplayMedia = () => {
  console.log('display')
}

const Canvas = ({ videoRef, width, height }) => {
  const canvasRef = createRef(null)

  useEffect(() => {
    if (canvasRef.current && videoRef.current) {
      const interval = setInterval(() => {
        const ctx = canvasRef.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, 250, 188)
      }, 60)
      return () => clearInterval(interval)
    }
  })

  return <canvas ref={canvasRef} width={width} height={height} />
}

export default Dashboard
