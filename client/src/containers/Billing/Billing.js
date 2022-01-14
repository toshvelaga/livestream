import React, { useState, useEffect } from 'react'
import PricingPlan from './PricingPlan'
import './Billing.css'
import Navbar from '../../components/Navbar/Navbar'

const Billing = () => (
  <section>
    <Navbar />
    <div>
      <p style={{ textAlign: 'center' }}>
        Upgrade now to get access to all features.
      </p>
      <PricingPlan />
    </div>
  </section>
)

export default Billing
