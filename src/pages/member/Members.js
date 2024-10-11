import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserList,
  getUserList,
  getOrgPosList,
  selectOrg,
  selectRoll,
} from "../../Server/Reducer/authSlice";
import {
  useCreateUserMemberMutation,
  useGetAllOrgUserQuery,
  useGetAllOrgPositionQuery,
  useCreateUserMemberOTPMutation,
} from "../../Server/Reducer/authApi";
import { getDecryptData } from "../../common/encrypt";
import { useNavigate } from "react-router-dom";
import { Drawer } from "@mui/material";
import CreateUser from "../../components/CreateUser";
import { CommonAlert } from "../../common/CommonAlert";
import CommonPagination from "../../common/CommonPagination";
import CardData from "../../components/Card/CardData";
import PositionList from "../../components/Position/PositionList";
import CreateOTP from "../../components/CreateOTP";

const Members = () => {
  const dispatch = useDispatch();
  const orgData = useSelector(selectOrg);
  const rollData = useSelector(selectRoll);
  const [createUserMember, { data, error: createError, isSuccess, isError }] =
    useCreateUserMemberMutation();
  const [
    createUserMemberOTP,
    {
      data: otpData,
      error: otpError,
      isSuccess: otpIsSuccess,
      isError: otpIsError,
    },
  ] = useCreateUserMemberOTPMutation();
  useGetAllOrgPositionQuery(orgData ? orgData?._id : "", {
    refetchOnMountOrArgChange: true,
    skip: !orgData?._id,
  });
  const orgPosList = useSelector(getOrgPosList);
  const userDataString = useSelector(getUserList);
  useGetAllOrgUserQuery(orgData ? orgData?._id : "", {
    refetchOnMountOrArgChange: true,
    skip: !orgData?._id,
  });

  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    if (userDataString) {
      setMemberList(userDataString);
    }
  }, [userDataString]);

  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phoneNo: "",
    password: "",
    userAddress: "",
    marraigestatus: "Single",
    dob: null,
    marraigedate: null,
  });
  const [formValueOTP, setFormValueOTP] = useState({});

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const getCurrentPageItems = () => {
    return rowsPerPage > 0
      ? memberList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : memberList;
  };

  const [fileUser, setFileUser] = useState(null);
  const [formError, setFormError] = useState({});
  const [errorUser, setErrorUser] = useState("");
  const [previewUser, setPreviewUser] = useState("");
  const [openUser, setOpenUser] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenUser(open);
  };
  const toggleOTPDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenOTP(open);
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
        orgId: orgData?._id,
      };
      var formData = new FormData();
      formData.append("json_data", JSON.stringify(newData));
      formData.append("userImage", fileUser);
      createUserMember(formData);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      const userDatas = getDecryptData(data?.data);
      const groupList = JSON.parse(userDatas);
      setFormValueOTP({ ...groupList, verificationEmailCode: "" });
      // dispatch(createUserList(groupList));
      setOpenUser(false);
      setOpenOTP(true);
      CommonAlert(data?.msg, "success");
    }
    if (isError) {
      CommonAlert(createError?.data?.msg, "error");
    }
  }, [isSuccess, isError, data, createError, setOpenUser, dispatch]);
  const handleViewClick = (e, li) => {
    e.preventDefault();
    navigate("/app/members_group", {
      state: li,
    });
  };

  const handleOTPChange = (e) => {
    const numberRegex = /^[0-9]+$/;
    if (e.target.value === "") {
      setFormValueOTP({
        ...formValueOTP,
        verificationEmailCode: "",
      });
    } else if (numberRegex.test(e.target.value)) {
      setFormValueOTP({
        ...formValueOTP,
        verificationEmailCode: e.target.value,
      });
    }
  };
  const [formOTPError, setFormOTPError] = useState({});
  const handleOTPClick = () => {
    const error = {};
    if (!formValueOTP?.verificationEmailCode) {
      error.verificationEmailCode = "OTP is required!.";
    }
    if (Object?.keys(error)?.length === 0) {
      var formData = new FormData();
      formData.append("json_data", JSON.stringify(formValueOTP));
      createUserMemberOTP(formData);
    } else {
      setFormOTPError(error);
      Object?.keys(error)?.map((li) => CommonAlert(error[li], "error"));
    }
  };
  useEffect(() => {
    if (otpIsSuccess) {
      const userDatas = getDecryptData(otpData?.data);
      const groupList = JSON.parse(userDatas);
      dispatch(createUserList(groupList));

      setOpenOTP(false);
      CommonAlert(otpData?.msg, "success");
    }
    if (otpIsError) {
      CommonAlert(otpError?.data?.msg, "error");
    }
  }, [otpIsSuccess, otpIsError, otpData, otpError, setOpenOTP, dispatch]);
  return (
    <div className="p-2 mb-5">
      {orgPosList?.Position?.length !== 0 && (
        <PositionList PositionList={orgPosList?.Position} />
      )}
      <div className="card mb-5">
        <div className="card-header">
          <div className="d-flex justify-content-between">
            <h5 className="fw-bold">User List</h5>
            <button
              className="btn btn-sm btn-primary"
              hidden={rollData?.rAccess === "W" || rollData?.rAccess === "R"}
              onClick={() => {
                setOpenUser(true);
              }}
            >
              Add User
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            {getCurrentPageItems()?.map((li) => {
              return (
                <div className="col-12 col-sm-12 col-md-4 col-lg-2">
                  <CardData
                    data={li}
                    address={li?.userAddress}
                    title={"User"}
                    dataId={li?.userId}
                    count={li?.memberCount}
                    roll={li.Roll?.rName}
                    handleViewClick={handleViewClick}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="cart-footer border">
          <CommonPagination
            items={memberList}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
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
          title="Create"
          subtitle="User"
        />
      </Drawer>
      <Drawer
        anchor="right"
        open={openOTP}
        onClose={toggleOTPDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#f5f5f5",
            width: "250px",
          },
        }}
      >
        <CreateOTP
          setOpenOTP={setOpenOTP}
          formValueOTP={formValueOTP}
          handleOTPChange={handleOTPChange}
          handleOTPClick={handleOTPClick}
          formOTPError={formOTPError}
        />
      </Drawer>
    </div>
  );
};

export default Members;
