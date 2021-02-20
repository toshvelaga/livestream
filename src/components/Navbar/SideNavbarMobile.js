import React from "react";
import * as FaIcons from "react-icons/fa";
import "./SideNavbar.css";

function SideNavbarMobile() {
  return (
    <div className="side-navbar-mobile">
      <button className="tablinks-mobile">
        <div className="side-navbar-icon-mobile">
          <FaIcons.FaThLarge size={20} />
        </div>
        <div className="side-navbar-title-mobile">Dashboard</div>
      </button>

      <button className="tablinks-mobile">
        <div className="side-navbar-icon-mobile">
          <FaIcons.FaBusinessTime size={20} />
        </div>
        <div className="side-navbar-title-mobile">Company</div>
      </button>

      <button className="tablinks-mobile">
        <div className="side-navbar-icon-mobile">
          <FaIcons.FaCalendarWeek size={20} />
        </div>
        <div className="side-navbar-title-mobile">Campaign</div>
      </button>

      <button className="tablinks-mobile">
        <div className="side-navbar-icon-mobile">
          <FaIcons.FaChartBar size={20} />
        </div>
        <div className="side-navbar-title-mobile">Analytics</div>
      </button>

      <button className="tablinks-mobile">
        <div className="side-navbar-icon-mobile">
          <FaIcons.FaCog size={20} />
        </div>
        <div className="side-navbar-title-mobile">Settings</div>
      </button>
    </div>
  );
}

export default SideNavbarMobile;
