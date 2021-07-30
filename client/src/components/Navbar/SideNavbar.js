import React from 'react'
import * as FaIcons from 'react-icons/fa'
import './SideNavbar.css'

function SideNavbar(props) {
  return (
    <ul className='side-navbar'>
      <li
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
        style={
          window.location.pathname === '/settings'
            ? { backgroundColor: '#ddd' }
            : null
        }
        className='tablinks'
      >
        <div className='side-navbar-icon'>
          <FaIcons.FaCog size={20} />
        </div>
        <div className='side-navbar-title'>Settings</div>
      </li>
    </ul>
  )
}

export default SideNavbar
