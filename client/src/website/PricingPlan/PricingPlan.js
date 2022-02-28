import React from 'react'
import './PricingPlan.css'
import PriceButton from '../Buttons/PriceButton'

// https://codepen.io/danhearn/pen/LjJXmj

const titleContainer = (title) => {
  return (
    <div class='title-container-plan'>
      <div class='title-plan'>{title}</div>
    </div>
  )
}

function PricingPlan() {
  return (
    <div class='planContainer'>
      <div class='plan'>
        {titleContainer('Starter')}
        <div class='infoContainer'>
          <div class='prices'>
            <p>$10 </p>
            <span style={{ marginLeft: '5px' }}>/mo</span>
          </div>
          <ul class='features'>
            <li>Unlimited Broadcasts</li>
            <li>Stream to up to 3 destinations simultaneously</li>
            <li>Automatically configures highest video resolution</li>
            <li>Low glass to glass latency</li>

            <li style={{ color: 'transparent' }}>|</li>
          </ul>
          <PriceButton title='Sign Up' />
        </div>
      </div>
      <div class='plan'>
        {titleContainer('Pro')}
        <div class='infoContainer'>
          <div class='prices'>
            <p>$19 </p>
            <span style={{ marginLeft: '5px' }}>/mo</span>
          </div>
          <ul class='features'>
            <li>Unlimited Broadcasts</li>
            <li>Stream to more than 3 destinations simultaneously</li>
            <li>Automatically configures highest video resolution</li>
            <li>Invite up to 4 on screen participants</li>
            <li>Record broadcasts in the cloud to edit later</li>
            <li style={{ color: 'transparent' }}>|</li>
          </ul>
          <PriceButton title='Sign Up' />
        </div>
      </div>

      <div class='plan'>
        {titleContainer('Expert')}
        <div class='infoContainer'>
          <div class='prices'>
            <p>$39</p>
            <span style={{ marginLeft: '5px' }}>/mo</span>
          </div>

          <ul class='features'>
            <li>Unlimited Podcasts</li>
            <li>Unlimited Episodes</li>
            <li>Advanced Analytics</li>
            <li>Embeddable Player</li>
            <li>Email Support</li>
            <li>Customizable Website</li>
            <li>Monetization Features</li>
          </ul>
          <PriceButton title='Sign Up' />
        </div>
      </div>
    </div>
  )
}

export default PricingPlan
