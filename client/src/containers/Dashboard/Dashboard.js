import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Dashboard.css'

function Dashboard() {
  const CAPTURE_OPTIONS = {
    audio: false,
    video: { facingMode: 'environment' },
  }

  useEffect(() => {
    var video = document.getElementById('video')

    if (navigator.mediaDevices.getUserMedia) {
      var successCallback = function (stream) {
        video.srcObject = stream
      }
      var errorCallback = function (error) {
        console.log(error)
      }
      navigator.mediaDevices
        .getUserMedia(CAPTURE_OPTIONS)
        .then(successCallback, errorCallback)
    }

    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')

    var ctx = canvas.getContext('2d')
    ctx.moveTo(0, 0)
    ctx.lineTo(200, 100)
    ctx.stroke()

    function renderFrame() {
      // re-register callback
      requestAnimationFrame(renderFrame)
      // set internal canvas size to match HTML element size
      canvas.width = canvas.scrollWidth
      canvas.height = canvas.scrollHeight
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        // scale and horizontally center the camera image
        var videoSize = { width: video.videoWidth, height: video.videoHeight }
        var canvasSize = { width: canvas.width, height: canvas.height }
        var renderSize = calculateSize(videoSize, canvasSize)
        var xOffset = (canvasSize.width - renderSize.width) / 2
        context.drawImage(
          video,
          xOffset,
          0,
          renderSize.width,
          renderSize.height
        )
      }
    }
  }, [])

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

  function calculateSize(srcSize, dstSize) {
    var srcRatio = srcSize.width / srcSize.height
    var dstRatio = dstSize.width / dstSize.height
    if (dstRatio > srcRatio) {
      return {
        width: dstSize.height * srcRatio,
        height: dstSize.height,
      }
    } else {
      return {
        width: dstSize.width,
        height: dstSize.width / srcRatio,
      }
    }
  }

  return (
    <>
      <Navbar />
      <div style={{ marginTop: '5rem' }} className='main'>
        <div id='container'>
          <video id='video' autoplay='true'></video>
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

export default Dashboard
