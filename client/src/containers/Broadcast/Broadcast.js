import React, { useState, useEffect, useRef } from 'react'
import Button from '../../components/Buttons/Button'
import Navbar from '../../components/Navbar/Navbar'

function Broadcast() {
  return (
    <>
      <Navbar />
      <div className='dashboard-container'>
        <h2 style={{ marginTop: '2rem' }}>Broadcasts</h2>
        <Button title='Create new Broadcast' />
      </div>
    </>
  )
}

export default Broadcast
