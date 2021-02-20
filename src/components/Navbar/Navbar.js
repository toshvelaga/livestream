import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import "./Navbar.css";
import SideNavbar from "./SideNavbar";

function Navbar(props) {
  const [sideNavOpen, setsideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setsideNavOpen((prevStatus) => !prevStatus);
  };

  return (
    <>
      {/* sticky top navbar */}
      <div class="top-navbar">
        <span>
          <FaIcons.FaUserCircle size={30} />
        </span>
        <span id="notification-icon">
          <FaIcons.FaBell size={20} />
        </span>
        <span onClick={toggleSideNav} id="hamburger-icon">
          {sideNavOpen ? (
            <FaIcons.FaTimes size={20} />
          ) : (
            <FaIcons.FaBars size={20} />
          )}
        </span>
      </div>
      {/* fixed side navbar with buttons */}
      <SideNavbar />
    </>
  );
}

export default Navbar;
