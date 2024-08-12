import React from "react";
import { Nav } from "react-bootstrap";
import "./Sidebar.css";

const Sidebar = ({ showSidebar }) => {
  return (
    <div className={`sidebar ${showSidebar ? "show" : ""}`}>
      <Nav className="flex-column">
        <Nav.Link href="/profile">Home</Nav.Link>
        <Nav.Link href="#">About</Nav.Link>
        <Nav.Link href="#">Contact</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
