import React from "react";
import "./Navbar.css";

// https://codepen.io/RajRajeshDn/pen/LYPeBOV
// https://dev.to/llorentegerman/building-a-ui-from-scratch-responsive-sidebar-and-header-443g

function Navbar(props) {
  const toggle = () => {
    document.getElementsByClassName(".wrapper").toggleClass("collapse");
  };
  return (
    <>
      <div class="wrapper">
        <div class="top_navbar">
          <div onClick={() => alert("clicked")} class="hamburger">
            <div class="one"></div>
            <div class="two"></div>
            <div class="three"></div>
          </div>
          <div class="top_menu">
            <ul>
              <li>
                <a href="#">
                  <i class="fas fa-search"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fas fa-bell"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fas fa-user"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="sidebar">
          <ul>
            <li>
              <a href="#">
                <span class="icon">
                  <i class="fas fa-book"></i>
                </span>
                <span class="title">Books</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="icon">
                  <i class="fas fa-file-video"></i>
                </span>
                <span class="title">Movies</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="icon">
                  <i class="fas fa-volleyball-ball"></i>
                </span>
                <span class="title">Sports</span>
              </a>
            </li>
            <li>
              <a href="#" class="active">
                <span class="icon">
                  <i class="fas fa-blog"></i>
                </span>
                <span class="title">Blogs</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="icon">
                  <i class="fas fa-leaf"></i>
                </span>
                <span class="title">Nature</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="main_container">{props.children}</div>
      </div>
    </>
  );
}

export default Navbar;
