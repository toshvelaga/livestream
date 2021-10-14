import React, { useState, useEffect, useRef } from 'react'
import Button from '../../components/Buttons/Button'
import Navbar from '../../components/Navbar/Navbar'
import Modal from 'react-modal'
import './Broadcast.css'

Modal.defaultStyles.overlay.backgroundColor = 'rgba(45, 45, 47, 0.75)'

function Broadcast() {
  const [isModalOpen, setisModalOpen] = useState(false)

  const closeModal = () => {
    setisModalOpen(false)
  }

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    console.log('after opening modal')
  }

  const openModal = () => {
    setisModalOpen(true)
  }

  return (
    <>
      <Navbar />
      <div className='dashboard-container'>
        <h2 style={{ marginTop: '2rem' }}>Broadcasts</h2>
        <Button fx={openModal} title='Create new Broadcast' />
      </div>
      <Modal
        className='broadcast-modal'
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel='Example Modal'
      >
        <p>Some random text</p>
      </Modal>
    </>
  )
}

export default Broadcast
