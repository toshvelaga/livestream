import React, { useState } from 'react'
import TextInput from '../../components/TextInput/TextInput'
// import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { Link } from 'react-router-dom'
import './Login.css'
import Button from '../../components/Buttons/Button'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //   const [errorMsgEmail, seterrorMsgEmail] = useState("");
  //   const [errorMsgPassword, seterrorMsgPassword] = useState("");

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
          {/* {errorMsgEmail ? <ErrorMessage errorMsg={errorMsgEmail} /> : null} */}
        </div>
        <Button style={{ width: '100%' }} title='Sign In' />

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
