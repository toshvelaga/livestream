import React from 'react'
import styles from '../../styles/styles'
import { Link } from 'react-router-dom'

const NoDestinationsMessage = () => {
  return (
    <p style={{ color: styles.greyFontColor, marginTop: 0 }}>
      Please add at least one{' '}
      <Link style={{ color: styles.blueFontColor }} to='/destinations'>
        destination
      </Link>{' '}
      to go live.
    </p>
  )
}

export default NoDestinationsMessage
