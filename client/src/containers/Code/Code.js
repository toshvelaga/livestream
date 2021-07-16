import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
import getCookie from '../../utils/getCookie'
import './Code.css'

function Code() {
  const [code, setCode] = useState('')
  const [userId, setuserId] = useState('')

  const history = useHistory()

  useEffect(() => {
    let userIdCookie = getCookie('userId')
    setuserId(userIdCookie)
  }, [])

  const submit = async () => {
    const data = {
      code: code,
      userId: userId,
    }

    try {
      let result = await axios.post('http://localhost:8080/compare-code', data)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
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
