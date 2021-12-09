import React from 'react'
import { useHistory } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import './SideNavbar.css'
import styles from '../../styles/styles'

function SideNavbar(props) {
  const history = useHistory()

  return (
    <ul className='side-navbar'>
      {/* Broadcasts */}
      <li
        onClick={() => history.push('/broadcast')}
        style={
          window.location.pathname === '/broadcast'
            ? { backgroundColor: styles.sideNavbarHoverColor }
            : null
        }
        className='tablinks'
      >
        <div className='side-navbar-icon'>
          <FaIcons.FaVideo size={styles.sideNavbarIconSize} />
        </div>
        <div className='side-navbar-title'>Broadcast</div>
      </li>
      {/* Destinations */}
      <li
        onClick={() => history.push('/destinations')}
        style={
          window.location.pathname === '/destinations'
            ? { backgroundColor: styles.sideNavbarHoverColor }
            : null
        }
        className='tablinks'
      >
        <div className='side-navbar-icon'>
          <FaIcons.FaKey size={styles.sideNavbarIconSize} />
        </div>
        <div className='side-navbar-title'>Destinations</div>
      </li>
      {/* Referrals */}

      {/* <li
        onClick={() => history.push('/referrals')}
        style={
          window.location.pathname === '/referrals'
            ? { backgroundColor: styles.sideNavbarHoverColor }
            : null
        }
        className='tablinks'
      >
        <div className='side-navbar-icon'>
          <FaIcons.FaShare size={styles.sideNavbarIconSize} />
        </div>
        <div className='side-navbar-title'>Referrals</div>
      </li> */}
    </ul>
  )
}

export default SideNavbar
