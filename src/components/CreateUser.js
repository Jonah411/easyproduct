import React from "react";
import {
  FormControl,
  Grid,
  TextField,
  Button,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

const CreateUser = ({
  setFormValue,
  formValue,
  setOpenUser,
  formError,
  handleUserClick,
}) => {
  console.log(formError, "formError");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <div>
      <div className="text-center mt-2">
        <h6>Create Organization</h6>
      </div>
      <div className=" p-2">
        <FormControl fullWidth className="mt-2">
          <TextField
            id="outlined-basic"
            label="User Name"
            variant="outlined"
            size="small"
            name="name"
            onChange={handleChange}
          />
          {formError?.name && (
            <FormHelperText error>{formError?.name}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth className="mt-4">
          <TextField
            id="outlined-basic"
            label="User Email"
            variant="outlined"
            size="small"
            name="email"
            type="email"
            onChange={handleChange}
          />
          {formError?.email && (
            <FormHelperText error>{formError?.email}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth className="mt-4">
          <TextField
            id="outlined-basic"
            label="User PhoneNo"
            variant="outlined"
            size="small"
            multiline
            name="phoneNo"
            onChange={handleChange}
          />
          {formError?.phoneNo && (
            <FormHelperText error>{formError?.phoneNo}</FormHelperText>
          )}
        </FormControl>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth className="mt-4">
              <TextField
                id="outlined-basic"
                label="Age"
                variant="outlined"
                size="small"
                name="age"
                onChange={handleChange}
                type="number"
              />
              {formError?.age && (
                <FormHelperText error>{formError?.age}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth className="mt-4">
              <InputLabel id="demo-simple-select-label">User Gender</InputLabel>
              <Select
                id="outlined-basic"
                label="User Gender"
                variant="outlined"
                defaultValue=""
                size="small"
                name="gender"
                onChange={handleChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
              {formError?.gender && (
                <FormHelperText error>{formError?.gender}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <FormControl fullWidth className="mt-4">
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            size="small"
            multiline
            name="password"
            onChange={handleChange}
          />
          {formError?.password && (
            <FormHelperText error>{formError?.password}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth className="mt-4">
          <Button
            variant="contained"
            size="large"
            className="p-3"
            onClick={(e) => {
              e.preventDefault();
              handleUserClick();
            }}
          >
            Create User
          </Button>
        </FormControl>
        <FormControl fullWidth className="mt-4">
          <Button
            variant="contained"
            size="large"
            className="p-3"
            onClick={(e) => {
              e.preventDefault();
              setOpenUser(false);
            }}
          >
            Close
          </Button>
        </FormControl>
      </div>
    </div>
  );
};

export default CreateUser;
