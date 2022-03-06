import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import API from '../../api/api'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
import setCookie from '../../utils/setCookie'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [error, seterror] = useState('')
  const [loading, setloading] = useState(false)

  const history = useHistory()

  const handleClick = () => {
    sendAuthCode()
  }

  const sendAuthCode = async () => {
    try {
      setloading(true)
      const response = await API.post('/user/login', {
        email: email,
      })
      console.log(response.data.error)
      seterror(response.data.error)
      console.log(response)
      if (response.data.user_id) {
        setCookie('userId', `${response.data.user_id}`, 7)
        setCookie('userEmail', email, 7)
        history.push('/login/code')
      }
    } catch (err) {
      console.log(err.response) // some reason error message
    } finally {
      setloading(false)
    }
  }

  const handleInputChange = (e) => {
    setEmail(e.target.value)
    if (error) {
      seterror('')
    }
  }

  return (
    <>
      <div className='login-container'>
        <div>
          <h2 className='login-title'>Log in to your account</h2>
          <p className='login-subtitle'>
            Enter your email and we'll send you a login code.
          </p>
          <TextInput
            label='Email'
            placeholder='Email Address'
            value={email}
            onChange={handleInputChange}
            errorMsg={error ? error : null}
          />
        </div>
        <Button
          loading={loading}
          style={{ width: '100%' }}
          id='login-button'
          title='Sign In'
          fx={handleClick}
        />

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
