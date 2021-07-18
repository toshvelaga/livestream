import React, { useState, useEffect, useRef } from 'react'
import GooglePopup from '../../components/GooglePopup/GooglePopup'
import Navbar from '../../components/Navbar/Navbar'
// import Card from "../../components/Card/Card";
import './Dashboard.css'

function Dashboard() {
  const videoRef = useRef(null)

  // useEffect(() => {
  //   getVideo()
  // }, [videoRef])

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current
        video.srcObject = stream
        video.play()
      })
      .catch((err) => {
        console.error('error:', err)
      })
  }

  const stopVideo = () => {
    let video = videoRef.current

    const stream = video.srcObject
    const tracks = stream.getTracks()

    for (let i = 0; i < tracks.length; i++) {
      let track = tracks[i]
      track.stop()
    }

    video.srcObject = null
  }

  return (
    <>
      <Navbar />
      <div style={{ marginTop: '5rem' }} className='main'>
        <h2>Scroll this page to see the effect</h2>
        <h2>
          The navigation bar will stay at the top of the page while scrolling
        </h2>
        <video muted id='video' autoPlay ref={videoRef} />
        <button onClick={getVideo}>start recording</button>
        <button onClick={stopVideo}>stop recording</button>
        {/* <Card />
        {process.env.REACT_APP_TITLE}
        {process.env.REACT_APP_DESCRIPTION} */}
        <GooglePopup />
        <p>Some text some text some text some text..</p>
      </div>
    </>
  )
}

export default Dashboard
