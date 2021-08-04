import React, { useState } from 'react'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
import { Link, useHistory } from 'react-router-dom'
import API from '../../api/api'
import './Register.css'
import setCookie from '../../utils/setCookie'

function Register() {
  const [email, setEmail] = useState('')
  const [error, seterror] = useState('')

  const history = useHistory()

  const handleClick = () => {
    sendAuthCode()
  }

  const sendAuthCode = async () => {
    try {
      const response = await API.post('/user/register', {
        email: email,
      })
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
            errorMsg={error ? error : null}
          />
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
