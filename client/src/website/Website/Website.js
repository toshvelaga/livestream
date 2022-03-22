import React, { useEffect, useState } from 'react'
import './Website.css'
import Button from '../../components/Buttons/Button'
import { Link, useHistory } from 'react-router-dom'
import Accordion from '../Collapsible/Accordion'
import Footer from '../Footer/Footer'
import PricingPlan from '../PricingPlan/PricingPlan'
import Input from '../Input/Input'
import eventTrack from '../../utils/eventTrack'
import youtube from '../../assets/youtube.svg'
import twitch from '../../assets/twitch.svg'
import facebook from '../../assets/facebook.svg'
import tiktok2 from '../../assets/tiktok2.svg'
import twitter from '../../assets/twitter.svg'
import linkedin from '../../assets/linkedin.svg'
import setCookie from '../../utils/setCookie'
import API from '../../api/api'
import hubspotEmail from '../../utils/hubspotEmail'
import { Helmet } from 'react-helmet'

function Website(props) {
  const [email, setEmail] = useState('')
  const [error, seterror] = useState('')
  const [loading, setloading] = useState(false)

  const history = useHistory()

  const handleInputChange = (e) => {
    setEmail(e.target.value)
    if (error) {
      seterror('')
    }
  }

  const emailSubmitHandler = () => {
    sendAuthCode()
  }

  const sendAuthCode = async () => {
    try {
      eventTrack('Landing Page', 'Sign Up For Free Button Clicked', 'Button')
      setloading(true)
      const response = await API.post('/user/register', {
        email: email,
      })
      console.log(response.data.error)
      seterror(response.data.error)
      console.log(response)
      if (response.data.user_id) {
        // REGISTER IN HUBSPOT
        hubspotEmail(email)
        setCookie('userId', `${response.data.user_id}`, 7)
        setCookie('userEmail', email, 7)
        history.push('/register/code')
      }
    } catch (err) {
      console.log(err.response) // some reason error message
    } finally {
      setloading(false)
    }
  }
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

        <div className='email-submit-input-container'>
          <div
            className='email-submit-input-container-child'
            style={{ marginRight: '1rem' }}
          >
            <Input
              id='enter-email-homepage'
              placeholder='Enter your email'
              onChange={handleInputChange}
              value={email}
              errorMsg={error ? error : null}
            />
          </div>
          <div className='email-submit-input-container-child'>
            <Button
              style={{ padding: '16px 30px' }}
              id='pulse'
              fx={emailSubmitHandler}
              title='Sign up for free'
            />
          </div>
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
            width='640'
            height='400'
            src='https://www.youtube.com/embed/yxk2QIh6uaw'
            title='Ohmystream demo'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
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
