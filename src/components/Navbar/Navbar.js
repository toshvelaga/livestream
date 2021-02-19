import React from "react";
import * as FaIcons from "react-icons/fa";
import "./Navbar.css";

function Navbar(props) {
  return (
    <>
      <div class="top-navbar">
        <span>
          <FaIcons.FaUserCircle size={30} />
        </span>
        <span id="notification-icon">
          <FaIcons.FaBell size={20} />
        </span>
      </div>
    </>
  );
}

export default Navbar;
