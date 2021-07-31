import React, { useState, useRef } from 'react'
import * as FaIcons from 'react-icons/fa'
import navbarStyles from './TopNavbar.module.css'

function TopNavbar() {
  return (
    <Navbar>
      {/* <NavItem icon={<BellIcon />} /> */}
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
      <a
        href='#'
        className={navbarStyles.iconButton}
        onClick={() => setOpen(!open)}
      >
        {props.icon}
      </a>

      {open && props.children}
    </li>
  )
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main')
  const dropdownRef = useRef(null)

  function DropdownItem(props) {
    return (
      <a
        href='#'
        className={navbarStyles.menuItem}
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className='icon-button'>{props.leftIcon}</span>
        {props.children}
      </a>
    )
  }

  return (
    <div className={navbarStyles.dropdown} ref={dropdownRef}>
      <div className={navbarStyles.menu}>
        <DropdownItem>Logout</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
      </div>
    </div>
  )
}

export default TopNavbar
