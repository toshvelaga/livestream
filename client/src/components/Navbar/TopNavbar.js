import React, { useState, useRef, useEffect } from 'react'
import * as FaIcons from 'react-icons/fa'
import navbarStyles from './TopNavbar.module.css'
import deleteAllCookies from '../../utils/deleteAllCookies'
import { Link, useHistory, useLocation, history } from 'react-router-dom'
import styles from '../../styles/styles'

function TopNavbar(props) {
  const history = useHistory()

  const handleClick = () => {
    history.push('/billing')
  }
  const url = window.location.pathname

  return (
    <Navbar>
      {/* <NavItem icon={<BellIcon />} /> */}
      {props.children}
      {!url.includes('/studio') && (
        <>
          <button onClick={handleClick} className={navbarStyles.upgradeButton}>
            Upgrade
          </button>
          <NavItem
            icon={
              <FaIcons.FaUser
                color={styles.navItemColor}
                size={styles.sideNavbarIconSize}
              />
            }
          >
            <DropdownMenu></DropdownMenu>
          </NavItem>
        </>
      )}
    </Navbar>
  )
}

function Navbar(props) {
  return (
    <nav className={navbarStyles.navbar}>
      <ul className={navbarStyles.navbarNav}>{props.children}</ul>
    </nav>
  )
}

function NavItem(props) {
  const [open, setOpen] = useState(false)
  const naviconRef = useRef(null)
  useOutsideAlerter(naviconRef)

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * close the topnavbar dropdown if it is open
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && open) {
          setOpen(false)
        }
      }

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref, open])
  }

  const closeNavbar = () => {
    setOpen(!open)
  }

  return (
    <li ref={naviconRef} className={navbarStyles.navItem}>
      <a className={navbarStyles.iconButton} onClick={closeNavbar}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  )
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main')
  const dropdownRef = useRef(null)

  const history = useHistory()

  function DropdownItem(props) {
    return (
      <a className={navbarStyles.menuItem} onClick={props.onClick}>
        <span style={{ marginLeft: '20px' }}>{props.children}</span>
      </a>
    )
  }

  const onLogout = () => {
    deleteAllCookies()
    history.push('/login')
  }

  return (
    <div className={navbarStyles.dropdown} ref={dropdownRef}>
      <div className={navbarStyles.menu}>
        <DropdownItem onClick={() => history.push('/broadcast')}>
          Broadcast
        </DropdownItem>
        <DropdownItem onClick={() => history.push('/destinations')}>
          Destinations
        </DropdownItem>
        <DropdownItem onClick={() => history.push('/billing')}>
          Billing
        </DropdownItem>
        <DropdownItem onClick={() => history.push('/settings')}>
          Settings
        </DropdownItem>
        <DropdownItem onClick={onLogout}>Logout</DropdownItem>
      </div>
    </div>
  )
}

export default TopNavbar
