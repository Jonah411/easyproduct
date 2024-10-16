import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  CircularProgress,
  TextField,
  Button,
  Drawer,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff, Clear } from "@mui/icons-material";
import OrgImg from "../images/orgImage.jpg";
import {
  useCreateOrganizationMutation,
  useCreateUserMemberOTPMutation,
  useGetAllOrgQuery,
} from "../Server/Reducer/authApi";
import CreateOrganization from "./CreateOrganization";
import CreateUser from "./CreateUser";
import { useNavigate } from "react-router-dom";
import { CommonAlert } from "../common/CommonAlert";
import { useDispatch, useSelector } from "react-redux";
import { createUserList, getOrgList } from "../Server/Reducer/authSlice";
import CreateOTP from "./CreateOTP";
import { getDecryptData } from "../common/encrypt";

const Login = ({ loginDataError, login }) => {
  const dispatch = useDispatch();
  const [createOrganization, { data, error: createError, isSuccess, isError }] =
    useCreateOrganizationMutation();
  const [
    createUserMemberOTP,
    {
      data: otpData,
      error: otpError,
      isSuccess: otpIsSuccess,
      isError: otpIsError,
    },
  ] = useCreateUserMemberOTPMutation();
  const orgData = useSelector(getOrgList);
  const { isLoading: orgLoading } = useGetAllOrgQuery("", {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [statusOrg, setStatusOrg] = useState(false);
  const [formLogin, setFormLogin] = useState({
    orgName: "",
    email: "",
    password: "",
  });
  const [formValue, setFormValue] = useState({
    orgName: "",
    orgPlace: "",
    orgAddress: "",
    orgMembersCount: "",
    orgDescription: "",
    orgYear: "",
    // orgMebAgeFrom: "",
    // orgMebAgeTo: "",
    orgDisplayName: "",
    name: "",
    age: "",
    gender: "",
    email: "",
    phoneNo: "",
    marraigestatus: "Single",
    dob: null,
    marraigedate: null,
    password: "",
    userAddress: "",
  });
  const [formValueOTP, setFormValueOTP] = useState({});
  const [formOTPError, setFormOTPError] = useState({});
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  const [fileUser, setFileUser] = useState(null);
  const [errorUser, setErrorUser] = useState("");
  const [previewUser, setPreviewUser] = useState("");

  const [formError, setFormError] = useState({});
  const [formLoginError, setFormLoginError] = useState({});

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
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
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const validation = (value) => {
    const error = {};

    // if (!fs) {
    //   error.fs = "Organization logo is required.";
    // }
    if (!value.orgName) {
      error.orgName = "Organization name is required.";
    }
    if (!value.orgDisplayName) {
      error.orgDisplayName = "Organization display name is required.";
    }
    if (!value.orgPlace) {
      error.orgPlace = "Organization place is required.";
    }
    if (!value.orgAddress) {
      error.orgAddress = "Organization address is required.";
    }
    if (!value.orgMembersCount) {
      error.orgMembersCount = "Organization members count is required.";
    } else if (isNaN(value.orgMembersCount)) {
      error.orgMembersCount = "Organization members count must be a number.";
    }
    if (!value.orgDescription) {
      error.orgDescription = "Organization description is required.";
    }
    if (!value.orgYear) {
      error.orgYear = "Organization year is required.";
    } else if (isNaN(value.orgYear)) {
      error.orgYear = "Organization year must be a number.";
    }
    // if (!value.orgMebAgeFrom) {
    //   error.orgMebAgeFrom = "Member age from is required.";
    // } else if (isNaN(value.orgMebAgeFrom)) {
    //   error.orgMebAgeFrom = "Member age from must be a number.";
    // }
    // if (!value.orgMebAgeTo) {
    //   error.orgMebAgeTo = "Member age to is required.";
    // } else if (isNaN(value.orgMebAgeTo)) {
    //   error.orgMebAgeTo = "Member age to must be a number.";
    // }

    return error;
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

  const validationLogin = (value) => {
    const error = {};
    if (!value.orgName) {
      error.orgName = "Organization is required.";
    }

    if (!value.email) {
      error.email = "Email is required.";
    }
    if (!value.password) {
      error.password = "Password is required.";
    }

    return error;
  };
  const handleClick = () => {
    setFormError(validation(formValue, file));
    const errorData = validation(formValue, file);
    if (Object.keys(errorData)?.length === 0) {
      setOpen(false);
      setOpenUser(true);
    }
  };
  const handleUserClick = () => {
    setFormError(validationUser(formValue, file));
    const errorData = validationUser(formValue);

    if (Object.keys(errorData)?.length === 0) {
      var formData = new FormData();
      formData.append("json_data", JSON.stringify(formValue));
      formData.append("orgLogo", file);
      formData.append("userImage", fileUser);
      createOrganization(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const userDatas = getDecryptData(data?.data);
      const groupList = JSON.parse(userDatas);
      setFormValueOTP({ ...groupList, verificationEmailCode: "" });
      setOpenUser(false);
      setOpenOTP(true);
      CommonAlert(data?.msg, "success");
    }
    if (isError) {
      CommonAlert(createError?.msg, "error");
    }
  }, [isSuccess, isError, data, createError, setOpen]);

  const handleLogin = async () => {
    setFormLoginError(validationLogin(formLogin));
    const errorData = validationLogin(formLogin);
    if (Object.keys(errorData)?.length === 0) {
      const body = {
        organization: formLogin?.orgName,
        email: formLogin?.email,
        password: formLogin?.password,
      };
      try {
        await login(body).then((res) => {
          if (res?.data) {
            CommonAlert(res?.data?.msg, "success");
            navigate("/app/dashboard");
          }
          if (res?.error?.status === 400) {
            CommonAlert(res?.error?.data?.msg, "error");
          }
        });
      } catch (err) {
        CommonAlert(loginDataError?.data?.msg, "error");
      }
    }
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
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 8,
      }}
    >
      <div className="login-box">
        <div className="mt-2">
          <h4 className="text-center">Get Organization</h4>
          <Grid container spacing={2} className="p-2">
            <Grid item xs={12} sm={9} md={8}>
              <div className="">
                {orgLoading ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CircularProgress size={24} style={{ marginRight: 10 }} />
                    Loading...
                  </div>
                ) : (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Organization Name
                    </InputLabel>
                    <Select
                      id="outlined-basic"
                      label="Organization Name"
                      variant="outlined"
                      defaultValue=""
                      onChange={(e) => {
                        setFormLogin({ ...formLogin, orgName: e.target.value });
                        const newList = orgData?.find(
                          (li) => li?._id === e.target.value
                        );
                        if (newList) {
                          setStatusOrg(true);
                          setFormValue({
                            ...formValue,
                            orgName: newList?.orgName,
                            orgPlace: newList?.orgPlace,
                            orgAddress: newList?.orgAddress,
                            orgMembersCount: newList?.orgMembersCount,
                            orgDescription: newList?.orgDescription,
                            orgYear: newList?.orgYear,
                            // orgMebAgeFrom: newList?.orgMebAgeFrom,
                            // orgMebAgeTo: newList?.orgMebAgeTo,
                            orgDisplayName: newList?.orgDisplayName,
                          });
                          setPreview(newList?.orgLogo);
                        } else {
                          setStatusOrg(false);
                          setFormValue({
                            ...formValue,
                            orgName: "",
                            orgPlace: "",
                            orgAddress: "",
                            orgMembersCount: "",
                            orgDescription: "",
                            orgYear: "",
                            // orgMebAgeFrom: "",
                            // orgMebAgeTo: "",
                          });
                          setPreview("");
                        }
                      }}
                    >
                      <MenuItem value="1">Select</MenuItem>
                      {orgData.map((option) => (
                        <MenuItem key={option?._id} value={option?._id}>
                          {option?.orgName}
                        </MenuItem>
                      ))}
                    </Select>
                    {formLoginError?.orgName && (
                      <FormHelperText error>
                        {formLoginError?.orgName}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
                <FormControl fullWidth className="mt-4">
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    value={formLogin?.email}
                    onChange={(e) => {
                      setFormLogin({ ...formLogin, email: e.target.value });
                    }}
                  />
                  {formLoginError?.email && (
                    <FormHelperText error>
                      {formLoginError?.email}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth className="mt-4">
                  <InputLabel id="demo-simple-select-label">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    value={formLogin?.password ? formLogin?.password : ""}
                    onChange={(e) => {
                      setFormLogin({ ...formLogin, password: e.target.value });
                    }}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        <IconButton
                          aria-label="clear password"
                          onClick={() => {
                            setFormLogin({ ...formLogin, password: "" });
                          }}
                          edge="end"
                        >
                          <Clear />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {formLoginError?.password && (
                    <FormHelperText error>
                      {formLoginError?.password}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth className="mt-4">
                  <Button
                    variant="contained"
                    size="large"
                    className="p-3"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogin();
                    }}
                  >
                    Login
                  </Button>
                </FormControl>
                <FormControl fullWidth className="mt-4">
                  <div className="d-flex justify-content-between">
                    <p>Forgot password</p>
                    <p
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={toggleDrawer(true)}
                    >
                      {statusOrg ? "View Organization" : "create Organization"}
                    </p>
                  </div>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={12} sm={3} md={4}>
              <img src={OrgImg} className="login-image" alt="org_Image" />
            </Grid>
          </Grid>
        </div>
        <Drawer
          anchor="right"
          open={open}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              backgroundColor: "#f5f5f5",
              width: "250px",
            },
          }}
        >
          <CreateOrganization
            setOpen={setOpen}
            formValue={formValue}
            setFormValue={setFormValue}
            setFile={setFile}
            file={file}
            setError={setError}
            error={error}
            setPreview={setPreview}
            preview={preview}
            setFormError={setFormError}
            formError={formError}
            handleClick={handleClick}
            statusOrg={statusOrg}
          />
        </Drawer>
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
    </Box>
  );
};

export default Login;
