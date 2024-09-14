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
      <div className="p-2">
        <div className="card">
          <div className="card-header">
            <h6 className="text-center fw-bold">
              {userData?.Organization?.orgDisplayName}
            </h6>
          </div>
          <div className="profile_dets">
            <div className="container">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-2">
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={`${BASE_URL}/image/${userData?.userImage}`}
                      alt={userData?.userImage}
                      className="img-thumbnail rounded mx-auto d-block"
                      width={100}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-3">
                  <div className=" rounded mx-auto d-block">
                    <p className="fw-bold text-light mt-2">
                      <span>User Name: {userData?.name}</span>
                    </p>
                    <p className="fw-bold text-light ">
                      <span>User Age: {userData?.age}</span>
                    </p>
                    <p className="fw-bold text-light">
                      <span>User Phone: {userData?.phoneNo}</span>
                    </p>
                    <p className="fw-bold text-light">
                      <span>User Email: {userData?.email}</span>
                    </p>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-4">
                  <div className=" rounded mx-auto d-block">
                    <p className="fw-bold text-light mt-2">
                      <span>User Gender: {userData?.gender}</span>
                    </p>
                    <p className="fw-bold text-light">
                      <span>User Address: {userData?.userAddress}</span>
                    </p>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-3">
                  <div className=" rounded mx-auto d-block">
                    <p className="fw-bold text-light mt-2">
                      <span>User Roll: {userData?.Roll?.rName}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  );
};

export default ProfileComponents;
