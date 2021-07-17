import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
import setCookie from '../../utils/setCookie'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [error, seterror] = useState('')

  const history = useHistory()

  const handleClick = () => {
    sendAuthCode()
    history.push('/login/code')
  }

  const sendAuthCode = async () => {
    try {
      const response = await axios.post('http://localhost:8080/user/login', {
        email: email,
      })
      console.log(response)
      // console.log(response.data.user_id)
      // setCookie('userId', `${response.data.user_id}`, 7)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='login-container'>
        <div>
          <TextInput
            label='Email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error ? <p style={{ color: 'red' }}>{error}</p> : null}
        </div>
        <Button style={{ width: '100%' }} title='Sign In' fx={handleClick} />

        <p style={{ color: 'grey', marginTop: '1rem', textAlign: 'center' }}>
          <Link
            style={{
              textDecoration: 'none',
              color: 'grey',
            }}
            to='/register'
          >
            Don't have an account? Sign Up
          </Link>
        </p>
      </div>
    </>
  )
}

export default Login
