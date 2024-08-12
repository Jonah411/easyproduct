import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import "./Layout.css";
import Sidebar from "./SideBar";

const Layout = ({ showSidebar, toggleSidebar }) => {
  return (
    <div className="app">
      <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <Header toggleSidebar={toggleSidebar} />
      <div className={`content ${showSidebar ? "content-with-sidebar" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
