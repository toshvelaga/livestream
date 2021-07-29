import React, { useState } from 'react'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import './Register.css'
import setCookie from '../../utils/setCookie'

function Register() {
  const [email, setEmail] = useState('')
  const [error, seterror] = useState('')

  const history = useHistory()

  const handleClick = () => {
    sendAuthCode()
    history.push('/register/code')
  }

  const sendAuthCode = async () => {
    try {
      const response = await axios.post('http://localhost:8080/user/register', {
        email: email,
      })
      console.log(response)
      // console.log(response.data.user_id)
      setCookie('userId', `${response.data.user_id}`, 7)
    } catch (error) {
      console.log(error)
      // console.log(error.response.data.error)
      // seterror(error.response.data.error)
    }
  }

  return (
    <>
      <div className='register-container'>
        <div>
          <h2>Create an account</h2>
          <p>
            We use passwordless sign up. Just enter your email and you'll get a
            code to use.
          </p>
          <TextInput
            label='Email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error ? <p style={{ color: 'red' }}>{error}</p> : null}
        </div>
        <div className='register-button'>
          <Button style={{ width: '100%' }} title='Sign Up' fx={handleClick} />
        </div>
        <p style={{ color: 'grey', marginTop: '1rem', textAlign: 'center' }}>
          <Link
            style={{
              textDecoration: 'none',
              color: 'grey',
            }}
            to='/login'
          >
            Already have an account? Sign in
          </Link>
        </p>
      </div>
    </>
  )
}

export default Register
