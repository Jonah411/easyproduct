import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import { getRollList, selectRoll } from "../../Server/Reducer/authSlice";

const Sidebar = ({ showSidebar }) => {
  const rollData = useSelector(selectRoll);
  const rollList = useSelector(getRollList);
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    const newRoll = rollList?.find((li) => li?._id === rollData?._id);
    setMenuList(newRoll?.rMenu);
  }, [rollList, rollData]);

  return (
    <div className={`sidebar ${showSidebar ? "show" : ""}`}>
      <Nav className="flex-column custom-nav">
        {menuList?.map((menu) => (
          <NavLink
            hidden={menu?.mLocationPath === "/app/members_group"}
            key={menu?._id}
            to={menu?.mLocationPath}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {menu?.mName}
          </NavLink>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
