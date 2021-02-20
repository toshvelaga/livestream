import React from "react";
import * as FaIcons from "react-icons/fa";

function SideNavbar() {
  return (
    <div className="side-navbar">
      <button className="tablinks">
        <div className="side-navbar-icon">
          <FaIcons.FaThLarge size={20} />
        </div>
        <div className="side-navbar-title">Dashboard</div>
      </button>

      <button className="tablinks">
        <div className="side-navbar-icon">
          <FaIcons.FaBusinessTime size={20} />
        </div>
        <div className="side-navbar-title">Company</div>
      </button>

      <button className="tablinks">
        <div className="side-navbar-icon">
          <FaIcons.FaCalendarWeek size={20} />
        </div>
        <div className="side-navbar-title">Campaign</div>
      </button>

      <button className="tablinks">
        <div className="side-navbar-icon">
          <FaIcons.FaChartBar size={20} />
        </div>
        <div className="side-navbar-title">Analytics</div>
      </button>

      <button className="tablinks">
        <div className="side-navbar-icon">
          <FaIcons.FaCog size={20} />
        </div>
        <div className="side-navbar-title">Settings</div>
      </button>
    </div>
  );
}

export default SideNavbar;
