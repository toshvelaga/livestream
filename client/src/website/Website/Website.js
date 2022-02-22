import React, { useEffect } from 'react'
import './Website.css'
import Button from '../../components/Buttons/Button'
import { Link } from 'react-router-dom'
import Accordion from '../Collapsible/Accordion'
import Footer from '../Footer/Footer'
import * as FaIcons from 'react-icons/fa'
import PricingPlan from '../PricingPlan/PricingPlan'
import eventTrack from '../../utils/eventTrack'
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
          id='wavvy-website-title'
          style={{ float: 'left', fontWeight: '600' }}
          to='/'
        >
          ohmystream
        </Link>

        <Link
          onClick={() =>
            eventTrack('Landing Page', 'Register Button Clicked', 'Button')
          }
          style={{ fontWeight: '600' }}
          to='/register'
        >
          Regsiter
        </Link>
        <Link
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
          Livestreaming Made Easy
        </h1>
        <p className='website-main-description'>
          Stream to Twitch, Youtube, and Facebook at the same time.
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
            title='Sign Up For Free'
          />
        </div>

        <div style={{ marginTop: '2rem' }} class='container-two'>
          <div class='row'>
            <div class='column sm-3'>
              <div className='icon-website-container'>
                <FaIcons.FaYoutube color='#ff0000' size={40} />
              </div>
              <p className='website-text-description'>Stream to Youtube</p>
            </div>

            <div class='column sm-3'>
              <div className='icon-website-container'>
                <FaIcons.FaTwitch color='#9047fe' size={40} />
              </div>
              <p className='website-text-description'>Stream to Twitch</p>
            </div>

            <div class='column sm-3'>
              <div className='icon-website-container'>
                <FaIcons.FaFacebookF color='#1878f1' size={40} />
              </div>
              <p className='website-text-description'>Stream to Facebook</p>
            </div>
          </div>
        </div>

        <div class='container-two'>
          <div class='row'>
            <div class='column sm-3'>
              <div className='icon-website-container'>
                <FaIcons.FaKeyboard color={'darkgrey'} size={40} />
              </div>
              <p className='website-text-description'>
                Stream to any custom RTMP destination
              </p>
            </div>

            <div class='column sm-3'>
              <div className='icon-website-container'>
                <FaIcons.FaTwitter color='#1b9bee' size={40} />
              </div>
              <p className='website-text-description'>
                Stream to Twitter Coming soon
              </p>
            </div>

            <div class='column sm-3'>
              <div className='icon-website-container'>
                <FaIcons.FaLinkedin color='#0966c2' size={40} />
              </div>
              <p className='website-text-description'>
                Stream to Linkedin coming soon
              </p>
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
