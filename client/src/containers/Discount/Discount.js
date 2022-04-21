import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { setCookie } from '../../utils/setCookie'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
import './Discount.css'
import appsumo from '../../assets/appsumo.svg'

const Discount = () => {
  const [email, setEmail] = useState('')
  const [error, seterror] = useState('')
  const [loading, setloading] = useState(false)

  const history = useHistory()

  const handleClick = () => {
    // sendAuthCode()
  }

  //   const sendAuthCode = async () => {
  //     try {
  //       setloading(true)
  //       const response = await API.post('/user/login', {
  //         email: email,
  //       })
  //       console.log(response.data.error)
  //       seterror(response.data.error)
  //       console.log(response)
  //       if (response.data.user_id) {
  //         setCookie('userId', `${response.data.user_id}`, 7)
  //         setCookie('userEmail', email, 7)
  //         history.push('/login/code')
  //       }
  //     } catch (err) {
  //       console.log(err.response) // some reason error message
  //     } finally {
  //       setloading(false)
  //     }
  //   }

  const handleInputChange = (e) => {
    setEmail(e.target.value)
    if (error) {
      seterror('')
    }
  }
  const { code } = useParams()

  useEffect(() => {
    console.log(code)
  }, [])

  return (
    <>
      <div
        style={{
          backgroundColor: '#fff',
          height: '100vh',
          //   textAlign: 'center',
        }}
      >
        <div style={{ width: '60%', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <img
              style={{ width: '300px', marginTop: '2rem' }}
              src={appsumo}
              alt='appsumo'
              className='appsumo-logo'
            />
            <p style={{ fontSize: '20px' }}>Ohmystream ❤️ AppSumo</p>
          </div>
          <div>
            <p className='login-subtitle'>
              Enter your email and we'll send you a login code. We use
              passwordless authentication so be sure to use the right email.
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
        </div>
      </div>
    </>
  )
}

export default Discount
