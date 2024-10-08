import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import {
  useGetAllRollQuery,
  useGetRoutesDataQuery,
} from "./Server/Reducer/authApi";
import { useDispatch, useSelector } from "react-redux";
import {
  createRollList,
  selectOrg,
  selectToken,
} from "./Server/Reducer/authSlice";
import RouterService from "./pages/Router/RouterService";
import { getDecryptData } from "./common/encrypt";

const App = () => {
  const user = useSelector(selectToken);
  const org = useSelector(selectOrg);
  const { data: rollDataString } = useGetAllRollQuery(org?._id, {
    refetchOnMountOrArgChange: org?._id ? true : false,
    skip: !user,
  });

  useGetRoutesDataQuery(org?._id, {
    refetchOnMountOrArgChange: org?._id ? true : false,
    skip: !user,
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
