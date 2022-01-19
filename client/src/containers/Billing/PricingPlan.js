import React from 'react'
import './PricingPlan.css'
import API from '../../api/api'
import getCookie from '../../utils/getCookie'

// https://codepen.io/danhearn/pen/LjJXmj

function UpgradePriceButton(props) {
  const STRIPE_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://buy.stripe.com/14kcOGfKZ5FI60oaEE'
      : 'https://buy.stripe.com/test_14k7wu57a89I5IA3cc'

  return (
    <>
      <a href={STRIPE_URL}>
        <button
          id='checkout'
          style={props.style}
          className='upgrade-price-button'
          onClick={props.onClick}
        >
          {props.title}
        </button>
      </a>
    </>
  )
}

function PricingPlan() {
  const email = getCookie('userEmail')

  const onClickHandler = async () => {
    await API.post('/email/payment-button-click', {
      email: email,
    })
  }

  return (
    <div class='planContainer'>
      <div class='plan'>
        <div class='titleContainer'>
          <div class='title'>Pro</div>
        </div>
        <div class='infoContainer'>
          <div style={{ padding: 0 }} class='prices'>
            <p>$10</p>
            <span>/mo</span>
          </div>
          <div class='p desc'></div>
          <ul class='features'>
            <li>✅ Unlimited Broadcasts</li>
            <li>✅ Stream to more than 3 destinations simultaneously</li>
            <li>✅ Automatically configures highest video resolution</li>
            <li>✅ Invite up to 4 on screen participants</li>
            <li style={{ marginBottom: 0, paddingBottom: 0 }}>
              ✅ Record broadcasts in the cloud to edit later
            </li>
            <li style={{ color: 'transparent' }}>|</li>
          </ul>
          <UpgradePriceButton title='Upgrade' onClick={onClickHandler} />
        </div>
      </div>
    </div>
  )
}

export default PricingPlan
