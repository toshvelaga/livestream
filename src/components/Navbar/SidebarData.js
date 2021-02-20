import React from "react";
import * as FaIcons from "react-icons/fa";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <FaIcons.FaThLarge />,
    cName: "nav-text",
  },
  {
    title: "Company",
    path: "/reports",
    icon: <FaIcons.FaBusinessTime />,
    cName: "nav-text",
  },
  {
    title: "Campaign",
    path: "/products",
    icon: <FaIcons.FaCalendarWeek />,
    cName: "nav-text",
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: <FaIcons.FaChartBar />,
    cName: "nav-text",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <FaIcons.FaCog />,
    cName: "nav-text",
  },
];
