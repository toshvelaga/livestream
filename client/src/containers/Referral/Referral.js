import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
import './Referral.css'

function Referral() {
  const [referralEmail, setReferralEmail] = useState('')
  const handleClick = () => {
    console.log('click')
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
          errorMsg={null}
        />
        <Button style={{ width: '100%' }} title='Send Email' fx={handleClick} />
      </div>
    </>
  )
}

export default Referral
