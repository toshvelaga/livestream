import React from 'react'
import { useHistory } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import './SideNavbar.css'

function SideNavbar(props) {
  const history = useHistory()

  return (
    <ul className='side-navbar'>
      <li
        onClick={() => history.push('/dashboard')}
        style={
          window.location.pathname === '/broadcast'
            ? { backgroundColor: '#ddd' }
            : null
        }
        className='tablinks'
      >
        <div className='side-navbar-icon'>
          <FaIcons.FaVideo size={20} />
        </div>
        <div className='side-navbar-title'>Broadcast</div>
      </li>

      <li
        onClick={() => history.push('/destinations')}
        style={
          window.location.pathname === '/destinations'
            ? { backgroundColor: '#ddd' }
            : null
        }
        className='tablinks'
      >
        <div className='side-navbar-icon'>
          <FaIcons.FaKey size={20} />
        </div>
        <div className='side-navbar-title'>Destinations</div>
      </li>

      {/* <li className='tablinks'>
        <div className='side-navbar-icon'>
          <FaIcons.FaChartBar size={20} />
        </div>
        <div className='side-navbar-title'>Analytics</div>
      </li> */}

      <li
        onClick={() => history.push('/referrals')}
        style={
          window.location.pathname === '/settings'
            ? { backgroundColor: '#ddd' }
            : null
        }
        className='tablinks'
      >
        <div className='side-navbar-icon'>
          <FaIcons.FaShare size={20} />
        </div>
        <div className='side-navbar-title'>Referrals</div>
      </li>
    </ul>
  )
}

export default SideNavbar
