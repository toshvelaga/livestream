import React, { useState, useEffect } from 'react'
import './Billing.css'

const ProductDisplay = () => (
  <section>
    <div className='product'>
      <h1>Billing Page</h1>
      <p>You are currently on the free plan.</p>
    </div>
    <form action='/create-checkout-session' method='POST'>
      {/* Add a hidden field with the lookup_key of your Price */}
      <input type='hidden' name='lookup_key' value='{{PRICE_LOOKUP_KEY}}' />
      <button id='checkout-and-portal-button' type='submit'>
        Checkout
      </button>
    </form>
  </section>
)

const SuccessDisplay = ({ sessionId }) => {
  return (
    <section>
      <div className='product Box-root'>
        <div className='description Box-root'>
          <h3>Subscription to starter plan successful!</h3>
        </div>
      </div>
      <form action='/create-portal-session' method='POST'>
        <input
          type='hidden'
          id='session-id'
          name='session_id'
          value={sessionId}
        />
        <button id='checkout-and-portal-button' type='submit'>
          Manage your billing information
        </button>
      </form>
    </section>
  )
}

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
)

export default function Billing() {
  let [message, setMessage] = useState('')
  let [success, setSuccess] = useState(false)
  let [sessionId, setSessionId] = useState('')

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)

    if (query.get('success')) {
      setSuccess(true)
      setSessionId(query.get('session_id'))
    }

    if (query.get('canceled')) {
      setSuccess(false)
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      )
    }
  }, [sessionId])

  if (!success && message === '') {
    return <ProductDisplay />
  } else if (success && sessionId !== '') {
    return <SuccessDisplay sessionId={sessionId} />
  } else {
    return <Message message={message} />
  }
}
