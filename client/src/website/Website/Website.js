import React, { useEffect } from 'react'
import './Website.css'
import Button from '../../components/Buttons/Button'
import { Link } from 'react-router-dom'
import Accordion from '../Collapsible/Accordion'
import Footer from '../Footer/Footer'
import * as FiIcons from 'react-icons/fi'
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
          ohmystream allows creators to livestream to Twitch, Youtube, and
          Facebook at the same time.
        </p>
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
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
                <FiIcons.FiRss color='#03a9f4' size={40} />
              </div>
              <p className='website-text-description'>
                Get an RSS feed that you can use for all major podcasting
                platforms
              </p>
            </div>

            <div class='column sm-3 even'>
              <div className='icon-website-container'>
                <FiIcons.FiTrendingUp color='#03a9f4' size={40} />
              </div>
              <p className='website-text-description'>
                Access insights into your audience through analytics
              </p>
            </div>
          </div>
        </div>

        <div class='container-two'>
          <div class='row'>
            <div class='column sm-3 odd'>
              <div className='icon-website-container'>
                <FiIcons.FiPlayCircle color='#03a9f4' size={40} />
              </div>
              <p className='website-text-description'>
                Embeddable audio player to add to your own website
              </p>
            </div>

            <div class='column sm-3 even'>
              <div className='icon-website-container'>
                <FiIcons.FiSettings color='#03a9f4' size={40} />
              </div>
              <p className='website-text-description'>
                Personalized website with all your podcasting, social media, and
                support links
              </p>
            </div>
          </div>
        </div>

        <div class='container-two'>
          <div class='row'>
            <div class='column sm-3 odd'>
              <div className='icon-website-container'>
                <FiIcons.FiDollarSign color='#03a9f4' size={40} />
              </div>
              <p className='website-text-description'>
                Monetize by accepting donations
              </p>
            </div>

            <div class='column sm-3 even'>
              <div className='icon-website-container'>
                <FiIcons.FiTwitter color='#03a9f4' size={40} />
              </div>
              <p className='website-text-description'>
                Share through social media
              </p>
            </div>
          </div>
        </div>

        <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>
          Pricing Plans
        </h1>

        <div
          className='pricing-container'
          style={{ paddingTop: '2rem', paddingBottom: '1rem' }}
        >
          <PricingPlan />
        </div>

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
