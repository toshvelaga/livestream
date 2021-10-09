import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Buttons/Button'
import API from '../../api/api'
import shareOnTwitter from '../../utils/shareOnTwitter'
import shareOnFacebook from '../../utils/shareOnFacebook'
import './Referral.css'
import ReferralButton from '../../components/Buttons/ReferralButton'
import * as FaIcons from 'react-icons/fa'

function Referral() {
  const [referralEmail, setReferralEmail] = useState('')
  const [referralEmailError, setreferralEmailError] = useState('')
  const [referralLinkButtonText, setreferralLinkButtonText] =
    useState('Copy Referral Link')

  const sendReferralEmail = async () => {
    try {
      const response = await API.post('/referral/email', {
        referralEmail,
        userEmail: 'toshvelaga@gmail.com',
      })
      setreferralEmailError(response.data.error)
    } catch (err) {
      console.log(err.response) // some reason error message
    }
  }

  const copyReferralLink = () => {
    setreferralLinkButtonText('Referral Link Copied!')
    setTimeout(() => {
      setreferralLinkButtonText('Copy Referral Link')
    }, 1500)
  }

  const handleInputChange = (e) => {
    setReferralEmail(e.target.value)
    if (referralEmailError) {
      setreferralEmailError('')
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
          onChange={handleInputChange}
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
            title={referralLinkButtonText}
          />
        </div>
      </div>
    </>
  )
}

export default Referral
