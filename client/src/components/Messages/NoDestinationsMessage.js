import React from 'react'
import styles from '../../styles/styles'
import { Link } from 'react-router-dom'
import './NoDestinationsMessage.css'

const NoDestinationsMessage = () => {
  return (
    <>
      <p
        style={{
          color: styles.greyFontColor,
          marginTop: 0,
        }}
      >
        Connect YouTube, Twitch, and FB:
        {/* <Link style={{ color: styles.blueFontColor }} to='/destinations'>
        destination
      </Link>{' '} */}
        <Link style={{ marginLeft: '1rem' }} to='/destinations'>
          <button className='connect-button'>Connect More Destinations</button>
        </Link>
      </p>
    </>
  )
}

export default NoDestinationsMessage
