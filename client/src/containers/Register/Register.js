import React, { useState } from 'react'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
import { Link } from 'react-router-dom'
import './Register.css'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <div className='register-container'>
        <div>
          <TextInput
            label='Email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='register-button'>
          <Button style={{ width: '100%' }} title='Submit' />
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
