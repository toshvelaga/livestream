import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
import getCookie from '../../utils/getCookie'
import './Code.css'

function Code() {
  const [code, setCode] = useState('')
  const [errorMessage, seterrorMessage] = useState('')

  const history = useHistory()

  const submit = async () => {
    let userId = getCookie('userId')
    console.log(userId)

    const data = {
      code: code,
      userId: userId,
    }

    try {
      let result = await axios.post('http://localhost:8080/compare-code', data)
      console.log(result.data.match)
      if (!result.data.match) {
        seterrorMessage('The code you entered does not match')
      }
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
        {errorMessage ? <p>{errorMessage}</p> : null}
        <Button fx={submit} style={{ width: '100%' }} title='Log In' />
      </div>
    </>
  )
}

export default Code
