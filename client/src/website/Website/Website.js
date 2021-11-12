import React, { useEffect } from 'react'
import './Website.css'
import Button from '../../components/Buttons/Button'
import { Link } from 'react-router-dom'
import Accordion from '../Collapsible/Accordion'
import Footer from '../Footer/Footer'
import * as FaIcons from 'react-icons/fa'
import PricingPlan from '../PricingPlan/PricingPlan'

function Website(props) {
  return (
    <>
      <div class='website-navbar'>
        <Link
          id='wavvy-website-title'
          style={{ float: 'left', fontWeight: '600' }}
          to='/'
        >
          ohmystream
        </Link>

        <Link style={{ fontWeight: '600' }} to='/register'>
          Regsiter
        </Link>
        <Link style={{ fontWeight: '600' }} to='/login'>
          Login
        </Link>
      </div>

      <div id='section-two'>
        <h1
          style={{
            marginTop: '8rem',
            textAlign: 'center',
          }}
        >
          Livestreaming Made Easy
        </h1>

        <p className='website-main-description'>
          Ohmystream allows creators to livestream to Twitch, Youtube, and
          Facebook at the same time.
        </p>
        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            fx={() => props.history.push('/register')}
            title='Sign Up For Free'
          />
        </div>

        <h1 style={{ textAlign: 'center', marginTop: '2rem', color: '#fff' }}>
          Grow Your Podcast
        </h1>
        <div class='container-two'>
          <div class='row'>
            <div class='column sm-3 odd'>
              <div className='icon-website-container'>
                <FaIcons.FaTwitch color='#9047fe' size={40} />
              </div>
              <p className='website-text-description'>Stream to Twitch</p>
            </div>

            <div class='column sm-3 even'>
              <div className='icon-website-container'>
                <FaIcons.FaYoutube color='#ff0000' size={40} />
              </div>
              <p className='website-text-description'>Stream to Youtube</p>
            </div>
          </div>
        </div>

        <div class='container-two'>
          <div class='row'>
            <div class='column sm-3 odd'>
              <div className='icon-website-container'>
                <FaIcons.FaFacebookF color='#1878f1' size={40} />
              </div>
              <p className='website-text-description'>Stream to Facebook</p>
            </div>

            <div class='column sm-3 even'>
              <div className='icon-website-container'>
                <FaIcons.FaLinkedin color='#0966c2' size={40} />
              </div>
              <p className='website-text-description'>
                Stream to Linkedin Coming soon
              </p>
            </div>
          </div>
        </div>

        {/* <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>
          Pricing Plans
        </h1>

        <div
          className='pricing-container'
          style={{ paddingTop: '2rem', paddingBottom: '1rem' }}
        >
          <PricingPlan />
        </div> */}

        <h1
          style={{
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          Frequently Asked Questions
        </h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '4rem',
          }}
        >
          <Accordion />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Website
