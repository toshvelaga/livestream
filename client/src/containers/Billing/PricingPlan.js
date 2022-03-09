import React from 'react'
import './PricingPlan.css'
import API from '../../api/api'
import getCookie from '../../utils/getCookie'
import { Link } from 'react-router-dom'

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

function PriceButton(props) {
  return (
    <>
      <Link to='/register'>
        <button
          id={props.id}
          style={props.style}
          className='price-button'
          onClick={props.fx}
        >
          {props.title}
        </button>
      </Link>
    </>
  )
}

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
      <p>
        <span style={{ fontSize: '20px' }}>$</span>
        <span style={{ fontSize: '36px' }}>{price}</span>
        <p style={{ fontSize: '12px', margin: 0 }}>per month</p>
      </p>
    </div>
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
        {titleContainer('Starter')}
        <div class='info-container'>
          {prices('10')}
          <ul class='plan-features'>
            <li>Unlimited Broadcasts</li>
            <li>Stream to &gt;3 destinations simultaneously</li>
            <li>Add custom RTMP destinations</li>
            <li>Highest video resolution</li>
            <li>Low latency</li>
          </ul>
          <div className='inside'>
            <UpgradePriceButton id='starter-price-button' title='Upgrade' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingPlan
