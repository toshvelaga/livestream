import React, { useState, useEffect, useRef } from 'react'
import Button from '../../components/Buttons/Button'
import Navbar from '../../components/Navbar/Navbar'

function Broadcast() {
  return (
    <>
      <Navbar />
      <div className='dashboard-container'></div>
      <Button title='Create a new Broadcast' />
    </>
  )
}

export default Broadcast
