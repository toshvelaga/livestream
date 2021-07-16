import React, { useState, useEffect } from 'react'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
import getCookie from '../../utils/getCookie'
import './Code.css'

function Code() {
  const [code, setCode] = useState('')
  const [userId, setuserId] = useState('')

  useEffect(() => {
    let userIdCookie = getCookie('userId')
    setuserId(userIdCookie)
  }, [])

  const submit = () => {
    console.log('submit')
  }

  return (
    <>
      <div className='code-container'>
        <TextInput
          label='Code'
          placeholder='Enter 6 digit code'
          value={code}
          maxLength={6}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button fx={submit} style={{ width: '100%' }} title='Log In' />
      </div>
    </>
  )
}

export default Code
