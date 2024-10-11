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
  OutlinedInput,
  Box,
} from "@mui/material";
import DatePicker from "react-datepicker";

const CreateUser = ({
  setFormValue,
  formValue,
  setOpenUser,
  formError,
  handleUserClick,
  setFileUser,
  setErrorUser,
  errorUser,
  setPreviewUser,
  previewUser,
  title,
  subtitle,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (selectedFile) {
      if (selectedFile.size > maxSize) {
        setErrorUser("File size exceeds 5 MB");
        setFileUser(null);
        setPreviewUser("");
      } else {
        setErrorUser("");
        setFileUser(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUser(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };
  return (
    <div>
      <div className="text-center mt-2">
        <h6>
          {title} {subtitle}
        </h6>
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
          <DatePicker
            selected={formValue?.dob}
            onChange={(date) => setFormValue({ ...formValue, dob: date })}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a DOB"
            className="custom-datepicker form-control"
          />
        </FormControl>
        <FormControl fullWidth className="mt-4">
          <InputLabel id="demo-simple-select-label">
            User Marraige Status
          </InputLabel>
          <Select
            id="outlined-basic"
            label="User Marraige Status"
            variant="outlined"
            value={formValue?.marraigestatus}
            size="small"
            name="marraigestatus"
            onChange={(e) => {
              const { value } = e.target;
              if (value === "Single") {
                setFormValue({
                  ...formValue,
                  marraigestatus: value,
                  marraigedate: null,
                });
              } else {
                setFormValue({
                  ...formValue,
                  marraigestatus: value,
                });
              }
            }}
          >
            <MenuItem value="Single">UnMarried</MenuItem>
            <MenuItem value="Married">Married</MenuItem>
          </Select>
        </FormControl>
        {formValue?.marraigestatus === "Married" && (
          <FormControl fullWidth className="mt-4">
            <DatePicker
              selected={formValue?.marraigedate}
              onChange={(date) =>
                setFormValue({ ...formValue, marraigedate: date })
              }
              dateFormat="dd/MM/yyyy"
              placeholderText="Select a marraigedate"
              className="custom-datepicker form-control"
            />
          </FormControl>
        )}
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
        <FormControl fullWidth sx={{ mt: 4 }}>
          <>
            <InputLabel htmlFor="upload-logo">User Image</InputLabel>
            <OutlinedInput
              id="upload-logo"
              type="file"
              label="User Image"
              size="small"
              inputProps={{
                accept: "image/*",
              }}
              onChange={handleFileChange}
              // disabled={statusOrg}
            />
          </>

          {errorUser && <FormHelperText error>{errorUser}</FormHelperText>}
          {/* {formError?.fs && (
            <FormHelperText error>{formError?.fs}</FormHelperText>
          )} */}
          <div>
            {previewUser && (
              <Box mt={2}>
                <img
                  src={previewUser}
                  alt="Preview"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}
          </div>
        </FormControl>
        <FormControl fullWidth className="mt-4">
          <TextField
            id="outlined-basic"
            label="User Address"
            variant="outlined"
            size="small"
            multiline
            rows={2}
            name="userAddress"
            onChange={handleChange}
          />
          {/* {formError?.userAddress && (
            <FormHelperText error>{formError?.userAddress}</FormHelperText>
          )} */}
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
            {title} {subtitle}
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
