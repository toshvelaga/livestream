import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
import axios from 'axios'
import shareOnTwitter from '../../utils/shareOnTwitter'
import shareOnFacebook from '../../utils/shareOnFacebook'
import './Referral.css'
import ReferralButton from '../../components/Buttons/ReferralButton'
import * as FaIcons from 'react-icons/fa'

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

  const copyReferralLink = () => {
    console.log('copy link')
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
        <div>
          <ReferralButton
            onClick={() => shareOnTwitter('twitter.com')}
            image={<FaIcons.FaTwitter size={20} color={'#1DA1F2'} />}
            title='Share on Twitter'
          />
          <ReferralButton
            onClick={() => shareOnFacebook('facebook')}
            image={<FaIcons.FaFacebook size={20} color={'#1878f1'} />}
            title='Share on Facebook'
          />
          <ReferralButton
            onClick={copyReferralLink}
            image={<FaIcons.FaCopy size={20} color={'grey'} />}
            title='Copy Referral Link'
          />
        </div>
      </div>
    </>
  )
}

export default Referral
