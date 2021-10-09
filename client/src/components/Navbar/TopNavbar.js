import React, { useState, useRef, useEffect } from 'react'
import * as FaIcons from 'react-icons/fa'
import navbarStyles from './TopNavbar.module.css'
import deleteAllCookies from '../../utils/deleteAllCookies'
import { Link, useHistory, useLocation } from 'react-router-dom'

function TopNavbar() {
  return (
    <Navbar>
      {/* <NavItem icon={<BellIcon />} /> */}
      <button className={navbarStyles.upgradeButton}>Upgrade</button>
      <NavItem icon={<FaIcons.FaUser size={20} />}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
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

  return (
    <li ref={naviconRef} className={navbarStyles.navItem}>
      <a className={navbarStyles.iconButton} onClick={() => setOpen(!open)}>
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
        <DropdownItem onClick={onLogout}>Logout</DropdownItem>
        <DropdownItem onClick={() => alert('coming soon')}>
          Settings
        </DropdownItem>
      </div>
    </div>
  )
}

export default TopNavbar
