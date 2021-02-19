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

      <div class="side-navbar">
        <button className="tablinks">Dashboard</button>
        <button className="tablinks">Company</button>
        <button className="tablinks">Campaign</button>
        <button className="tablinks">
          <FaIcons.FaChartBar size={20} />
          Analytics
        </button>
        <button className="tablinks">
          <FaIcons.FaCog size={20} />
          Settings
        </button>
      </div>
    </>
  );
}

export default Navbar;
