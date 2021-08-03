import React from 'react'
import './PricingPlan.css'
import PriceButton from '../Buttons/PriceButton'

// https://codepen.io/danhearn/pen/LjJXmj

function PricingPlan() {
  return (
    <div class='planContainer'>
      <div class='plan'>
        <div class='titleContainer'>
          <div class='title'>Free</div>
        </div>
        <div class='infoContainer'>
          <div class='prices'>
            <p>$0 </p>
            <span style={{ marginLeft: '5px' }}>/mo</span>
          </div>
          <div class='p desc'>
            {/* <em>Great for beginners and hobbyists.</em> */}
          </div>
          <ul class='features'>
            <li>Unlimited Podcasts</li>
            <li>Unlimited Episodes</li>
            <li>Basic Analytics</li>
            <li>Embeddable Player</li>
            <li>Email Support</li>
            <li>Customizable Website</li>
            <li style={{ color: 'transparent' }}>|</li>
          </ul>
          {/* <a class="selectPlan">Select Plan</a> */}
          <PriceButton title='Sign Up' />
        </div>
      </div>
      <div class='plan'>
        <div class='titleContainer'>
          <div class='title'>Pro</div>
        </div>
        <div class='infoContainer'>
          <div class='prices'>
            <p>$19 </p>
            <span style={{ marginLeft: '5px' }}>/mo</span>
          </div>
          <div class='p desc'>
            {/* <em>Recommended for podcasters looking to start a movement.</em> */}
          </div>
          <ul class='features'>
            <li>Unlimited Podcasts</li>
            <li>Unlimited Episodes</li>
            <li>Analytics</li>
            <li>Embeddable Player</li>
            <li>Email Support</li>
            <li>Customizable Website</li>
            <li style={{ color: 'transparent' }}>|</li>
          </ul>
          {/* <a class="selectPlan">Select Plan</a> */}
          <PriceButton title='Sign Up' />
        </div>
      </div>
      <div class='plan'>
        <div class='titleContainer'>
          <div class='title'>Premium</div>
        </div>
        <div class='infoContainer'>
          <div class='prices'>
            <p>$39</p>
            <span style={{ marginLeft: '5px' }}>/mo</span>
          </div>
          <div class='p desc'>
            <em>
              {/* Recommended for podcasters who are serious about building a big
							audience. */}
            </em>
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
          {/* <a class="selectPlan">Select Plan</a> */}
          <PriceButton title='Sign Up' />
        </div>
      </div>
    </div>
  )
}

export default PricingPlan
