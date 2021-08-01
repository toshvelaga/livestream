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
        <span>{props.image}</span>
        <span className='referral-button-title-span'>{props.title}</span>
      </button>
    </>
  )
}

export default ReferralButton
