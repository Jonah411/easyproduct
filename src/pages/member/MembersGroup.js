import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../common/ConstaltsVariables";
import {
  useCreateMemberMutation,
  //   useCreateMemberMutation,
  useGetAllOrgUserMemberQuery,
} from "../../Server/Reducer/authApi";
import { useDispatch, useSelector } from "react-redux";
import {
  createMemberGroupList,
  getMemberGroupList,
} from "../../Server/Reducer/authSlice";
import { Drawer } from "@mui/material";
import CreateUser from "../../components/CreateUser";
import { CommonAlert } from "../../common/CommonAlert";
import { getDecryptData } from "../../common/encrypt";

const MembersGroup = () => {
  const location = useLocation();
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAllOrgUserMemberQuery(userData ? userData : "", {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [createMember, { data, error: createError, isSuccess, isError }] =
    useCreateMemberMutation();
  const memberGroupDataString = useSelector(getMemberGroupList);
  const [memberGroupList, setMemberGroupList] = useState([]);
  const [formValue, setFormValue] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phoneNo: "",
    password: "",
    userAddress: "",
  });

  const [fileUser, setFileUser] = useState(null);
  const [formError, setFormError] = useState({});
  const [errorUser, setErrorUser] = useState("");
  const [previewUser, setPreviewUser] = useState("");
  const [openUser, setOpenUser] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenUser(open);
  };
  const validationUser = (value) => {
    const error = {};
    if (!value.name) {
      error.name = "User Name is required.";
    }
    if (!value.age) {
      error.age = "User age to is required.";
    } else if (isNaN(value.age)) {
      error.age = "User age to must be a number.";
    }
    if (!value.gender) {
      error.gender = "User Gender is required.";
    }
    if (!value.email) {
      error.email = "User Email is required.";
    }
    if (!value.phoneNo) {
      error.phoneNo = "User PhoneNo is required.";
    }
    if (!value.password) {
      error.password = "User Password is required.";
    }
    return error;
  };
  const handleUserClick = () => {
    setFormError(validationUser(formValue));
    const errorData = validationUser(formValue);

    if (Object.keys(errorData)?.length === 0) {
      const newData = {
        ...formValue,
        orgId: userData?.Organization?._id,
        userId: userData?._id,
      };
      var formData = new FormData();
      formData.append("json_data", JSON.stringify(newData));
      formData.append("memberImage", fileUser);
      console.log(formValue, fileUser, userData);
      createMember(formData);
    }
  };
  useEffect(() => {
    if (location?.state) {
      setUserData(location?.state);
    }
  }, [location]);

  useEffect(() => {
    if (memberGroupDataString?.length !== 0) {
      setMemberGroupList(memberGroupDataString);
    } else {
      setMemberGroupList([]);
    }
  }, [memberGroupDataString]);
  useEffect(() => {
    console.log(isError, createError, data);

    if (isSuccess) {
      const memberDatas = getDecryptData(data?.data);
      const groupList = JSON.parse(memberDatas);
      dispatch(createMemberGroupList(groupList));
      setOpenUser(false);
      CommonAlert(data?.msg, "success");
    }
    if (isError) {
      CommonAlert(createError?.data?.msg, "error");
    }
  }, [isSuccess, isError, data, createError, setOpenUser, dispatch]);
  return (
    <div>
      <div className="p-2">
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <h6 className="text-center fw-bold">User Information</h6>
            <div className="">
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  navigate("/app/member");
                }}
              >
                Back
              </button>
            </div>
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
                      <span>User Age: {userData?.age}</span>
                    </p>
                    <p className="fw-bold text-light">
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
      <div className="p-2 mb-5">
        <div className="card mb-5">
          <div className="card-header">
            <div className="d-flex justify-content-between">
              <h6 className="fw-bold">Memer List</h6>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  setOpenUser(true);
                }}
              >
                Add
              </button>
            </div>
          </div>
          <div className="card-body m-0 p-0">
            {" "}
            <div className="table-responsive">
              <div className="table-responsive table-wrapper">
                <table className="table table-bordered table-hover wo-table m-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Ph.No</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Roll</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memberGroupList?.length !== 0 ? (
                      memberGroupList?.map((li) => {
                        return (
                          <tr key={li?._id}>
                            <td>{li.name}</td>
                            <td>{li.age}</td>
                            <td>{li.gender}</td>
                            <td>{li.phoneNo}</td>
                            <td>{li.email}</td>
                            <td>{li.userAddress}</td>
                            <td>{li.Roll?.rName}</td>
                            <td>
                              {
                                <img
                                  src={`${BASE_URL}/image/${li?.memberImage}`}
                                  alt={li?.userImage}
                                  className="text-center roundedCircle  mt-0 mb-0"
                                  width={50}
                                />
                              }
                            </td>
                            <td>
                              <button className="btn btn-sm btn-success">
                                Update
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={9}
                          className="text-center fw-bold text-danger"
                        >
                          No Data!.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        anchor="right"
        open={openUser}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#f5f5f5",
            width: "250px",
          },
        }}
      >
        <CreateUser
          setOpenUser={setOpenUser}
          formValue={formValue}
          setFormValue={setFormValue}
          setFormError={setFormError}
          formError={formError}
          handleUserClick={handleUserClick}
          fileUser={fileUser}
          setFileUser={setFileUser}
          previewUser={previewUser}
          setPreviewUser={setPreviewUser}
          errorUser={errorUser}
          setErrorUser={setErrorUser}
        />
      </Drawer>
    </div>
  );
};

export default MembersGroup;