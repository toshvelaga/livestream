import React from 'react'
import './Pricing.css'
import PriceButton from '../Buttons/PriceButton'
// import * as MdIcons from "react-icons/md";

// pricing table: https://www.w3schools.com/howto/howto_css_pricing_table.asp

function Pricing(props) {
  return (
    <div>
      <div class='columns'>
        <ul class='price'>
          <li class='header'>Basic</li>
          <li class='grey'>$ 0 / month</li>
          <li>1 Podcast</li>
          <li>Unlimited Episodes</li>
          <li>Basic Analytics</li>
          <li>Embeddable Player</li>
          <li>Email Support</li>
          <li style={{ color: 'transparent' }}>|</li>
          <li style={{ color: 'transparent' }}>|</li>
          <li class='grey'>
            <PriceButton title='Sign Up' />
          </li>
        </ul>
      </div>

      <div class='columns'>
        <ul class='price'>
          <li
            class='header'
            // style={{ backgroundColor: "#fff", color: "black" }}
          >
            Pro
          </li>
          <li class='grey'>$ 10 / month</li>
          <li>Unlimited Podcasts</li>
          <li>Unlimited Episodes</li>
          <li>Analytics</li>
          <li>Embeddable Player</li>
          <li>Email Support</li>
          <li>Customizable Website</li>
          <li style={{ color: 'transparent' }}>|</li>
          <li class='grey'>
            <PriceButton title='Sign Up' />
          </li>
        </ul>
      </div>

      {/* <div class="columns">
				<ul class="price">
					<li class="header">Premium</li>
					<li class="grey">$ 20 / month</li>
					<li>Unlimited Podcasts</li>
					<li>Unlimited Episodes</li>
					<li>Advanced Analytics</li>
					<li>Embeddable Player</li>
					<li>Email Support</li>
					<li>Customizable Website</li>
					<li>Monetization Features</li>
					<li class="grey">
						<PriceButton title="Sign Up" />
					</li>
				</ul>
			</div> */}
    </div>
  )
}

export default Pricing
