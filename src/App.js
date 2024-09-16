import React, { useEffect, useState } from "react";

import "./App.css";
import { useGetAllRollQuery } from "./Server/Reducer/authApi";
import { useDispatch } from "react-redux";
import { createRollList } from "./Server/Reducer/authSlice";
import RouterService from "./pages/Router/RouterService";
import { getDecryptData } from "./common/encrypt";

const App = () => {
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

  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div>
      <RouterService toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
    </div>
  );
};

export default App;
