import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Navbar.css";
import SideNavbar from "./SideNavbar";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <>
      {!sidebar
        ? (document.body.style.backgroundColor = "rgba(0,0,0,0)")
        : (document.body.style.backgroundColor = "rgba(0,0,0,.5)")}

      {/* sticky top navbar */}
      <div className="top-navbar">
        <span className="user-circle-icon">
          <FaIcons.FaUserCircle size={30} />
        </span>
        <span className="notification-icon">
          <FaIcons.FaBell size={20} />
        </span>
        <span onClick={showSidebar} className="hamburger-icon">
          <FaIcons.FaBars size={20} />
        </span>
      </div>
      {/* fixed side navbar with buttons */}
      <SideNavbar />
      {/* Mobile navbar overlay for small screen size */}

      <IconContext.Provider value={{ color: "black" }}>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="hamburger-icon">
                <FaIcons.FaBars size={20} />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span style={{ marginLeft: "5px" }}>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
