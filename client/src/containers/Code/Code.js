import React, { useState, useEffect } from 'react'
import API from '../../api/api'
import { useHistory } from 'react-router-dom'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
import getCookie from '../../utils/getCookie'
import setCookie from '../../utils/setCookie'
import './Code.css'

function Code() {
  const [code, setCode] = useState('')
  const [error, seterror] = useState('')
  const [loading, setloading] = useState(false)

  const email = getCookie('userEmail')
  const history = useHistory()

  const submit = async () => {
    let userId = getCookie('userId')

    const data = {
      code: code,
      userId: userId,
    }

    try {
      setloading(true)
      let result = await API.post('/compare-code', data)
      console.log(result.data.match)
      if (!result.data.match) {
        seterror('The code you entered does not match')
      } else {
        // REGISTER IN HUBSPOT
        if (window.location.pathname.includes('register')) {
          console.log('HUBSPOT')
          API.post('/hubspot', {
            email: email,
          })
        }
        setCookie('isLoggedIn', true, 7)

        history.push('/broadcast')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setloading(false)
    }
  }

  const handleCodeChange = (e) => {
    setCode(e.target.value)
    if (error) {
      seterror('')
    }
  }

  return (
    <>
      <div className='code-container'>
        <div>
          <h2 className='code-title'>Email Sent!</h2>
          <p className='code-subtitle'>
            Please check your email for your login code.
          </p>
          <TextInput
            style={error ? { border: '1px solid red' } : null}
            label='Login Code'
            placeholder='Enter 6 digit code'
            value={code}
            maxLength={6}
            onChange={handleCodeChange}
            errorMsg={error ? error : null}
          />
          <Button
            id='code-button'
            fx={submit}
            style={{ width: '100%' }}
            title='Submit'
          />
        </div>
      </div>
    </>
  )
}

export default Code
