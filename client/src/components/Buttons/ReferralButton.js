import React from 'react'
import './ReferralButton.css'

function ReferralButton(props) {
  return (
    <>
      <button
        style={props.style}
        className='referral-button'
        onClick={props.onClick}
      >
        {props.title}
      </button>
    </>
  )
}

export default ReferralButton
