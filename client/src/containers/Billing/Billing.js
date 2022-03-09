import React, { useState, useEffect } from 'react'
import PricingPlan from './PricingPlan'
import './Billing.css'
import Navbar from '../../components/Navbar/Navbar'

const Billing = () => (
  <section>
    <Navbar />
    <div className='billing-container'>
      <h2 style={{ textAlign: 'center' }}>
        Upgrade now to get access to all features.
      </h2>
      <PricingPlan />
    </div>
  </section>
)

export default Billing
