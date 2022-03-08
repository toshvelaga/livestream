import React, { useEffect } from 'react'
import './Website.css'
import Button from '../../components/Buttons/Button'
import { Link } from 'react-router-dom'
import Accordion from '../Collapsible/Accordion'
import Footer from '../Footer/Footer'
import * as FaIcons from 'react-icons/fa'
import PricingPlan from '../PricingPlan/PricingPlan'
import eventTrack from '../../utils/eventTrack'
import youtube from '../../assets/youtube.svg'
import twitch from '../../assets/twitch.svg'
import facebook from '../../assets/facebook.svg'
import tiktok2 from '../../assets/tiktok2.svg'
import twitter from '../../assets/twitter.svg'
import linkedin from '../../assets/linkedin.svg'
import { Helmet } from 'react-helmet'

function Website(props) {
  return (
    <>
      <div class='website-navbar'>
        {/* <Helmet>
          {window.location.pathname === '/' ? (
            <script
              type='text/javascript'
              id='hs-script-loader'
              async
              defer
              src='//js-na1.hs-scripts.com/21300894.js'
            ></script>
          ) : null}
        </Helmet> */}
        <Link
          className='navbar-logo'
          style={{ float: 'left', fontWeight: '600' }}
          to='/'
        >
          ohmystream
        </Link>

        <Link
          onClick={() =>
            eventTrack('Landing Page', 'Register Button Clicked', 'Button')
          }
          className='signup-button-in-navbar'
          to='/register'
        >
          Sign-up
        </Link>
        <Link
          className='navbar-logo'
          onClick={() =>
            eventTrack('Landing Page', 'Login Button Clicked', 'Button')
          }
          style={{ fontWeight: '600' }}
          to='/login'
        >
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
          Multistream Everywhere Easily
        </h1>
        <p className='website-main-description'>
          ✨ Stream to Twitch, Youtube, Facebook and custom destinations at the
          same time.
        </p>
        <p className='website-main-description'>
          ✨ No complicated downloads — livestream directly from your browser.
        </p>
        <p className='website-main-description'>
          ✨ Start your first stream in &lt;2 minutes
        </p>

        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            id='pulse'
            fx={() => {
              props.history.push('/register')
              eventTrack(
                'Landing Page',
                'Sign Up For Free Button Clicked',
                'Button'
              )
            }}
            title='Sign up for free'
          />
        </div>
        <div style={{ marginTop: '2rem' }} class='container-two'>
          <div class='row'>
            <div class='column sm-3'>
              <div className='icon-website-container'>
                <img src={youtube} alt='youtube' />
              </div>
              <p className='website-text-description'>Youtube</p>
            </div>

            <div class='column sm-3'>
              <div className='icon-website-container'>
                <img src={twitch} alt='twitch' />
              </div>
              <p className='website-text-description'>Twitch</p>
            </div>

            <div class='column sm-3'>
              <div className='icon-website-container'>
                <img src={facebook} alt='facebook' />
              </div>
              <p className='website-text-description'>Facebook</p>
            </div>
          </div>
        </div>
        <div class='container-two'>
          <div class='row'>
            <div class='column sm-3'>
              <img src={tiktok2} alt='tiktok2' />
              <p className='website-text-description'>
                Custom RTMP destination
              </p>
            </div>

            <div class='column sm-3'>
              <img src={twitter} alt='twitter' />
              <p className='website-text-description'>Twitter Coming soon</p>
            </div>

            <div class='column sm-3'>
              <img src={linkedin} alt='linkedin' />
              <p className='website-text-description'>Linkedin coming soon</p>
            </div>
          </div>
        </div>
        <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>
          Pricing Plans
        </h1>
        <div className='pricing-container' style={{ paddingBottom: '1rem' }}>
          <PricingPlan />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
          }}
        >
          <iframe
            title='video demo of ohmystream thumbnail'
            width='640'
            height='400'
            src='https://www.loom.com/embed/35a86c6f73d144d59527092118cf525d'
            frameborder='0'
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
          ></iframe>
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
