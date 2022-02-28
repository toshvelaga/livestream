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

const prices = (price) => {
  return (
    <div class='prices-plans'>
      <p>{'$' + price} /mo</p>
    </div>
  )
}

function PricingPlan() {
  return (
    <div class='planContainer'>
      <div class='plan'>
        {titleContainer('Starter')}
        <div class='infoContainer'>
          {prices('10')}
          <ul class='features'>
            <li>Unlimited Broadcasts</li>
            <li>Stream to up to 3 destinations simultaneously</li>
            <li>Automatically configures highest video resolution</li>
            <li>Low glass to glass latency</li>
          </ul>
          <PriceButton title='Sign Up' />
        </div>
      </div>

      <div class='plan'>
        {titleContainer('Premium')}
        <div class='infoContainer'>
          {prices('19')}
          <ul class='features'>
            <li>Unlimited Broadcasts</li>
            <li>Stream to more than 3 destinations simultaneously</li>
            <li>Automatically configures highest video resolution</li>
            <li>Invite up to 4 on screen participants</li>
            <li>Record broadcasts in the cloud to edit later</li>
          </ul>
          <PriceButton title='Sign Up' />
        </div>
      </div>

      <div class='plan'>
        {titleContainer('Enterprise')}
        <div class='infoContainer'>
          {prices('39')}
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
