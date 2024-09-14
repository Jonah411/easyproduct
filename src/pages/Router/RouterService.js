import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import Layout from "../dashboard/Layout";
import Dashboard from "../home/Dashboard";
import OrgType from "../orgType/OrgType";
import Member from "../member/Member";

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
          <Route path="profile" element={<Profile />} />
          <Route path="app/dashboard" element={<Dashboard />} />
          <Route path="app/member" element={<Member />} />
          <Route path="app/orgType" element={<OrgType />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterService;
