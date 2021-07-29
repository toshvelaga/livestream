import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
import getCookie from '../../utils/getCookie'
import './Code.css'
import setCookie from '../../utils/setCookie'

function Code() {
  const [code, setCode] = useState('')
  const [error, seterror] = useState('')

  const history = useHistory()

  const submit = async () => {
    let userId = getCookie('userId')

    const data = {
      code: code,
      userId: userId,
    }

    try {
      let result = await axios.post('http://localhost:8080/compare-code', data)
      console.log(result.data.match)
      if (!result.data.match) {
        seterror('The code you entered does not match')
      } else {
        setCookie('isLoggedIn', true, 7)
        history.push('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='code-container'>
        <div>
          <h2>Email Sent!</h2>
          <p>Please check your email for your login code.</p>
          <TextInput
            label='Login Code'
            placeholder='Enter 6 digit code'
            value={code}
            maxLength={6}
            onChange={(e) => setCode(e.target.value)}
            errorMsg={error ? error : null}
          />
          <Button fx={submit} style={{ width: '100%' }} title='Submit' />
        </div>
      </div>
    </>
  )
}

export default Code
