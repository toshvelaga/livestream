import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
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
  }

  const sendAuthCode = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5001/api/user/login',
        {
          email: email,
        }
      )
      console.log(response.data.error)
      seterror(response.data.error)
      console.log(response)
      if (response.data.user_id) {
        setCookie('userId', `${response.data.user_id}`, 7)
        history.push('/login/code')
      }
    } catch (err) {
      console.log(err.response) // some reason error message
    }
  }

  return (
    <>
      <div className='login-container'>
        <div>
          <h2>Log in to your account</h2>
          <p>Enter your email and we'll send you a login code.</p>
          <TextInput
            label='Email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            errorMsg={error ? error : null}
          />
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
