import React from 'react'
import './PricingPlan.css'
import { Link } from 'react-router-dom'

// https://codepen.io/danhearn/pen/LjJXmj

function UpgradePriceButton(props) {
  return (
    <>
      <a href='https://buy.stripe.com/14kcOGfKZ5FI60oaEE'>
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
          <UpgradePriceButton title='Upgrade' />
        </div>
      </div>
    </div>
  )
}

export default PricingPlan
