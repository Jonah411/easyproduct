import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Login from "./components/Login";
import "./App.css";
import { useGetAllRollQuery, useLoginMutation } from "./Server/Reducer/authApi";
import { useDispatch, useSelector } from "react-redux";
import { createRollList, selectToken } from "./Server/Reducer/authSlice";
import RouterService from "./pages/Router/RouterService";
import { getDecryptData } from "./common/encrypt";

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
  const { data: rollDataString } = useGetAllRollQuery("", {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (rollDataString) {
      const rollDatas = getDecryptData(rollDataString?.data);
      dispatch(createRollList(JSON.parse(rollDatas)));
    }
  }, [rollDataString, dispatch]);
  const user = useSelector(selectToken);

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
          <RouterService
            toggleSidebar={toggleSidebar}
            showSidebar={showSidebar}
          />
        </div>
      )}
    </div>
  );
};

export default App;
