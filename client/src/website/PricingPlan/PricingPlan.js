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
    <div class='pricing-plan-container'>
      <div class='plan'>
        {titleContainer('Starter 🎬')}
        <div class='info-container'>
          {prices('10')}
          <ul class='plan-features'>
            <li>Unlimited Broadcasts</li>
            <li>Stream to &gt;3 destinations simultaneously</li>
            <li>Add custom RTMP destinations</li>
            <li>Highest video resolution</li>
            <li>Low latency</li>
          </ul>
          <PriceButton title='Sign Up' />
        </div>
      </div>

      <div class='plan'>
        {titleContainer('Premium 📽️')}
        <div class='info-container'>
          {prices('19')}
          <ul class='plan-features'>
            <li>Unlimited Broadcasts</li>
            <li>Stream to &gt;3 destinations simultaneously</li>
            <li>Add custom RTMP destinations</li>
            <li>Highest video resolution</li>
            <li>Lowest latency Possible</li>
            <li>Invite up to 6 on screen participants</li>
          </ul>
          <PriceButton title='Sign Up' />
        </div>
      </div>

      <div class='plan'>
        {titleContainer('Enterprise 🎥')}
        <div class='info-container'>
          {prices('39')}
          <ul class='plan-features'>
            <li>Unlimited Broadcasts</li>
            <li>Stream to &gt;3 destinations simultaneously</li>
            <li>Add custom RTMP destinations</li>
            <li>Highest video resolution</li>
            <li>Lowest latency Possible</li>
            <li>Invite up to 40 participants</li>
            <li>Record broadcasts in the cloud to edit later</li>
          </ul>
          <PriceButton title='Sign Up' />
        </div>
      </div>
    </div>
  )
}

export default PricingPlan
