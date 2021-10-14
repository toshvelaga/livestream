import React, { useState, useEffect, useRef } from 'react'
import Button from '../../components/Buttons/Button'
import TextInput from '../../components/TextInput/TextInput'
import TextArea from '../../components/TextArea/TextArea'
import Navbar from '../../components/Navbar/Navbar'
import Modal from 'react-modal'
import './Broadcast.css'

Modal.defaultStyles.overlay.backgroundColor = 'rgba(45, 45, 47, 0.75)'

function Broadcast() {
  const [isModalOpen, setisModalOpen] = useState(false)
  const [youtubeTitle, setyoutubeTitle] = useState('')

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
        <p>Broadcast to:</p>
        <TextInput
          label='Title'
          placeholder=''
          value={youtubeTitle}
          onChange={(e) => setyoutubeTitle(e.target.value)}
          errorMsg={null}
        />
        <TextArea
          label='Description'
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <Button style={{ width: '100%' }} title='Create Broadcast' />
      </Modal>
    </>
  )
}

export default Broadcast
