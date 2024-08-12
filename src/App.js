import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Login from "./components/Login";
import "./App.css";
import { useLoginMutation } from "./Server/Reducer/authApi";
import Layout from "./pages/dashboard/Layout";
import Profile from "./pages/Profile/Profile";
import { useSelector } from "react-redux";
import { selectOrg, selectToken } from "./Server/Reducer/authSlice";

const App = () => {
  const [
    login,
    {
      data: loginData,
      isSuccess: loginSuccess,
      error: loginDataError,
      isError: loginError,
    },
  ] = useLoginMutation();

  const user = useSelector(selectToken);
  const user1 = useSelector(selectOrg);
  console.log(user1);

  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div>
      {!user ? (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Login
            login={login}
            loginData={loginData}
            loginSuccess={loginSuccess}
            loginDataError={loginDataError}
            loginError={loginError}
          />
        </Box>
      ) : (
        <div>
          {" "}
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout
                    showSidebar={showSidebar}
                    toggleSidebar={toggleSidebar}
                  />
                }
              >
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
