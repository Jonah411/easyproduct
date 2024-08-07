import React, { useState } from "react";

import {
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
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OrgImg from "../images/orgImage.jpg";
import { useGetAllOrgQuery } from "../Server/Reducer/authApi";
import CreateOrganization from "./CreateOrganization";

const Login = () => {
  const { data: orgData, isLoading: orgLoading } = useGetAllOrgQuery("");
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
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
                  >
                    {orgData?.data.map((option) => (
                      <MenuItem key={option?._id} value={option?._id}>
                        {option?.orgName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <FormControl fullWidth className="mt-4">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                />
              </FormControl>
              <FormControl fullWidth className="mt-4">
                <InputLabel id="demo-simple-select-label">Password</InputLabel>
                <OutlinedInput
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
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
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl fullWidth className="mt-4">
                <Button variant="contained" size="large" className="p-3">
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
                    create Organization
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
        <CreateOrganization setOpen={setOpen} />
      </Drawer>
    </div>
  );
};

export default Login;
