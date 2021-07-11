import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar/Navbar'
// import Card from "../../components/Card/Card";
import './Dashboard.css'

function Dashboard() {
  const videoRef = useRef(null)

  useEffect(() => {
    getVideo()
  }, [videoRef])

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

  return (
    <>
      <Navbar />
      <div style={{ marginTop: '5rem' }} class='main'>
        <h2>Scroll this page to see the effect</h2>
        <h2>
          The navigation bar will stay at the top of the page while scrolling
        </h2>
        <video muted id='video' autoplay ref={videoRef} />
        <button>start recording</button>
        <button>stop recording</button>
        {/* <Card />
        {process.env.REACT_APP_TITLE}
        {process.env.REACT_APP_DESCRIPTION} */}
        <p>Some text some text some text some text..</p>
      </div>
    </>
  )
}

export default Dashboard
