import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
import axios from 'axios'
import './Referral.css'

function Referral() {
  const [referralEmail, setReferralEmail] = useState('')
  const [referralEmailError, setreferralEmailError] = useState('')

  const sendReferralEmail = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/referral/email',
        {
          referralEmail,
          userEmail: 'toshvelaga@gmail.com',
        }
      )
      setreferralEmailError(response.data.error)
    } catch (err) {
      console.log(err.response) // some reason error message
    }
  }

  return (
    <>
      <Navbar />
      <div className='referrals-container'>
        <h2>Referrals</h2>
        <TextInput
          label='Refer a friend'
          placeholder='yourfriend@gmail.com'
          value={referralEmail}
          onChange={(e) => setReferralEmail(e.target.value)}
          errorMsg={referralEmailError ? referralEmailError : null}
        />
        <Button
          style={{ width: '100%' }}
          title='Send Email'
          fx={sendReferralEmail}
        />
      </div>
    </>
  )
}

export default Referral
