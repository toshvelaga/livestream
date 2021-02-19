import React from "react";
import * as FaIcons from "react-icons/fa";
import "./Navbar.css";

function Navbar(props) {
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
      </div>
      {/* fixed side navbar with buttons */}
      <div className="side-navbar">
        <button className="tablinks">
          <span className="side-navbar-icon">
            <FaIcons.FaThLarge size={20} />
          </span>
          <span className="side-navbar-title">Dashboard</span>
        </button>

        <button className="tablinks">
          <span className="side-navbar-icon">
            <FaIcons.FaBusinessTime size={20} />
          </span>
          <span className="side-navbar-title">Company</span>
        </button>

        <button className="tablinks">
          <span className="side-navbar-icon">
            <FaIcons.FaCalendarWeek size={20} />
          </span>
          <span className="side-navbar-title">Campaign</span>
        </button>

        <button className="tablinks">
          <span className="side-navbar-icon">
            <FaIcons.FaChartBar size={20} />
          </span>
          <span className="side-navbar-title">Analytics</span>
        </button>

        <button className="tablinks">
          <span className="side-navbar-icon">
            <FaIcons.FaCog size={20} />
          </span>
          <span className="side-navbar-title">Settings</span>
        </button>
      </div>
    </>
  );
}

export default Navbar;
