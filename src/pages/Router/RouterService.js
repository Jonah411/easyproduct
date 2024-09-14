import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import Layout from "../dashboard/Layout";
import Dashboard from "../home/Dashboard";
import OrgType from "../orgType/OrgType";
import Members from "../member/Members";
import MembersGroup from "../member/MembersGroup";

const RouterService = ({ toggleSidebar, showSidebar }) => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
          }
        >
          <Route path="app/profile" element={<Profile />} />
          <Route path="app/dashboard" element={<Dashboard />} />
          <Route path="app/member" element={<Members />} />
          <Route path="app/orgType" element={<OrgType />} />
          <Route path="app/members_group" element={<MembersGroup />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterService;
