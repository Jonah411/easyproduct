import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import Layout from "../dashboard/Layout";
import Dashboard from "../home/Dashboard";
import OrgType from "../orgType/OrgType";
import Members from "../member/Members";
import MembersGroup from "../member/MembersGroup";
import Login from "../../components/Login";
import { useLoginMutation } from "../../Server/Reducer/authApi";
import { useSelector } from "react-redux";
import { selectToken } from "../../Server/Reducer/authSlice";

const RouterService = ({ toggleSidebar, showSidebar }) => {
  const user = useSelector(selectToken);
  const [
    login,
    {
      data: loginData,
      isSuccess: loginSuccess,
      error: loginDataError,
      isError: loginError,
    },
  ] = useLoginMutation();
  return (
    <Router>
      <Routes>
        {!user ? (
          <Route
            path="/"
            element={
              <Login
                login={login}
                loginData={loginData}
                loginSuccess={loginSuccess}
                loginDataError={loginDataError}
                loginError={loginError}
              />
            }
          />
        ) : (
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
        )}
      </Routes>
    </Router>
  );
};

export default RouterService;
