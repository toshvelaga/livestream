import React, { useState, useEffect, useRef } from 'react'
import GooglePopup from '../../components/GooglePopup/GooglePopup'
import Navbar from '../../components/Navbar/Navbar'
// import Card from "../../components/Card/Card";
import './Dashboard.css'

function Dashboard() {
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
        .getUserMedia({
          audio: false,
          video: { facingMode: { ideal: 'environment' } }, // prefer rear-facing camera
        })
        .then(successCallback, errorCallback)
    }

    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')

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
          <canvas id='canvas'></canvas>
        </div>
      </div>
    </>
  )
}

export default Dashboard
