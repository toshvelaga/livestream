import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Dashboard.css'

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: 'environment' },
}

function Dashboard() {
  const videoRef = useRef()
  const mediaStream = useUserMedia(CAPTURE_OPTIONS)

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream
  }

  const handleCanPlay = () => {
    videoRef.current.play()
  }

  // useEffect(() => {
  //   const ws = new WebSocket(
  //     window.location.protocol.replace('http', 'ws') +
  //       '//' + // http: -> ws:, https: -> wss:
  //       'localhost:3000'
  //   )
  //   console.log(ws)
  //   let mediaStream
  //   let mediaRecorder
  //   ws.addEventListener('open', (e) => {
  //     console.log('WebSocket Open', e)
  //     mediaStream = document.querySelector('video').captureStream(30) // 30 FPS
  //     mediaRecorder = new MediaRecorder(mediaStream, {
  //       mimeType: 'video/webm;codecs=h264',
  //       videoBitsPerSecond: 3 * 1024 * 1024,
  //     })

  //     mediaRecorder.addEventListener('dataavailable', (e) => {
  //       ws.send(e.data)
  //       console.log('send data')
  //     })

  //     // mediaRecorder.addEventListener('stop', ws.close.bind(ws))

  //     mediaRecorder.start(1000)
  //     // Start recording, and dump data every second
  //   })

  //   ws.addEventListener('close', (e) => {
  //     console.log('WebSocket Close', e)
  //     // mediaRecorder.stop()
  //   })
  // }, [])

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
          <canvas id='canvas' style={{ border: '1px solid red' }}></canvas>
        </div>
        <div className='button-container'>
          <button>Go Live</button>
          <button>Stop Recording</button>
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

export default Dashboard
