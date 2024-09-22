import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../dashboard/Layout";

import Login from "../../components/Login";
import { useLoginMutation } from "../../Server/Reducer/authApi";
import { useSelector } from "react-redux";
import { getRouteList, selectToken } from "../../Server/Reducer/authSlice";
import RouteMapping from "./RouteMapping";

const RouterService = ({ toggleSidebar, showSidebar }) => {
  const routeList = useSelector(getRouteList);
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
            {routeList &&
              routeList?.length !== 0 &&
              routeList?.map((route) => {
                const RouteComponent = RouteMapping[route.cName];
                if (!RouteComponent) {
                  console.error(`No component found for route: ${route.cName}`);
                  return null;
                } else {
                  return (
                    <Route
                      path={route?.cLocationPath}
                      element={<RouteComponent />}
                      key={route?._id}
                    />
                  );
                }
              })}
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default RouterService;
