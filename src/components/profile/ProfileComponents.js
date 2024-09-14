import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../Server/Reducer/authSlice";
import {
  useGetAllMenuQuery,
  useGetSingleUserQuery,
} from "../../Server/Reducer/authApi";
import { BASE_URL } from "../../common/ConstaltsVariables";
import { getDecryptData } from "../../common/encrypt";
import Menu from "../Menu/Menu";
import RollAccess from "../Menu/RollAccess";

const ProfileComponents = () => {
  const userId = useSelector(selectUser);

  const { data: userDataString } = useGetSingleUserQuery(userId?._id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const { data: menuDataString, refetch } = useGetAllMenuQuery("", {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [userData, setUserData] = useState({});
  const [menuList, setMenuList] = useState([]);
  useEffect(() => {
    if (userDataString?.status) {
      const userDatas = getDecryptData(userDataString?.data);
      setUserData(JSON.parse(userDatas));
    }
  }, [userDataString]);

  return (
    <div className="mb-5">
      <div className="p-2 profilecomp" style={{ background: "#72acd4" }}>
        <h6 className="text-light text-center fw-bold pt-2">
          {userData?.Organization?.orgDisplayName}
        </h6>
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-5">
            <div className="d-flex ">
              <img
                src={`${BASE_URL}/image/${userData?.userImage}`}
                alt={userData?.data?.userImage}
                className="text-center profile-image mt-0 mb-0"
                style={{ height: "20vh", width: "20%" }}
              />
              <div className="fw-bold" style={{ height: "20vh" }}>
                <p className="m-0 text-light">Name: {userData?.name}</p>
                <div className="d-flex gap-2">
                  <p className="m-0 text-light">Age: {userData?.age}</p>{" "}
                  <p className="m-0 text-light">Gender: {userData?.gender}</p>
                </div>
                <p className="m-0 text-light">Email: {userData?.email}</p>
                <p className="m-0 text-light">PhoneNo: {userData?.phoneNo}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-4">
            <div className="fw-bold" style={{ height: "20vh" }}>
              <p className="m-0 text-light">Address: </p>
              <p className="m-0 text-light"> {userData?.userAddress}</p>
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3">
            <div className="fw-bold text-end " style={{ height: "20vh" }}>
              <p className="m-0 text-light">Roll: {userData?.Roll?.rName}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        {userData?.Roll?.fAccess === "F" && (
          <div>
            <Menu refetch={refetch} setMenuList={setMenuList} />
            <RollAccess
              menuDataString={menuDataString}
              setMenuList={setMenuList}
              menuList={menuList}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileComponents;
