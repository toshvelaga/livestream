import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='bottom-footer'>
      <span className='footer-link-text'>
        Made in the United States of America 🇺🇸
      </span>
      <span className='footer-link'>
        <Link
          className='footer-link-text'
          style={{ textDecoration: 'none' }}
          to='/terms'
        >
          Terms of Service
        </Link>
      </span>
      <span className='footer-link'>
        <Link
          to={{
            pathname: '/privacy-policy',
          }}
          className='footer-link-text'
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
