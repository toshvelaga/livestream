import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Settings.css'

function Settings() {
  return (
    <>
      <Navbar />
      <div style={{ margin: '3rem auto', width: '60%' }}>
        <h2>Settings</h2>
        <p>
          You are currently on the <b>FREE TIER</b>
        </p>
        <p>User email: </p>
        <p>
          Have a question about your account? Send us an email using the form
          below.
        </p>
      </div>
    </>
  )
}

export default Settings
