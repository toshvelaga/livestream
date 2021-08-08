import React, { useState, useRef } from 'react'
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

  return (
    <li className={navbarStyles.navItem}>
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
