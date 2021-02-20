import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import "./Navbar.css";
import SideNavbar from "./SideNavbar";

function Navbar() {
  const [sideNavOpen, setsideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setsideNavOpen((prevStatus) => !prevStatus);
    // document.body.style.opacity = 0.5;
  };

  return (
    <>
      {/* sticky top navbar */}
      <div className="top-navbar">
        <span className="user-circle-icon">
          <FaIcons.FaUserCircle size={30} />
        </span>
        <span className="notification-icon">
          <FaIcons.FaBell size={20} />
        </span>
        <span onClick={toggleSideNav} className="hamburger-icon">
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
