import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='bottom-footer'>
      <span>Made in the United States of America 🇺🇸</span>
      <span className='footer-link'>
        <Link style={{ textDecoration: 'none' }} to='/terms'>
          Terms of Service
        </Link>
      </span>
      <span className='footer-link'>
        <Link
          to={{
            pathname:
              'https://www.termsfeed.com/live/808297c1-cd41-476c-8eee-166145da1fc5',
          }}
          target='_blank'
          style={{ textDecoration: 'none' }}
        >
          Privacy Policy
        </Link>
      </span>
    </div>
  )
}

export default Footer
