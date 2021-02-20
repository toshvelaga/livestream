import React from "react";
import * as FaIcons from "react-icons/fa";

function SideNavbar() {
  return (
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
  );
}

export default SideNavbar;
