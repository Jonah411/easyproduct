import {
  FormControl,
  Grid,
  TextField,
  OutlinedInput,
  InputLabel,
  Button,
  Box,
  FormHelperText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCreateOrganizationMutation } from "../Server/Reducer/authApi";
import { toast } from "react-toastify";

const CreateOrganization = ({ setOpen }) => {
  const [createOrganization, { data, error: createError, isSuccess, isError }] =
    useCreateOrganizationMutation();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const [formValue, setFormValue] = useState({
    orgName: "",
    orgPlace: "",
    orgAddress: "",
    orgMembersCount: "",
    orgDescription: "",
    orgYear: "",
    orgMebAgeFrom: "",
    orgMebAgeTo: "",
  });
  const [formError, setFormError] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (selectedFile) {
      if (selectedFile.size > maxSize) {
        setError("File size exceeds 5 MB");
        setFile(null);
        setPreview("");
      } else {
        setError("");
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  const validation = (value, fs) => {
    const error = {};

    if (!fs) {
      error.fs = "Organization logo is required.";
    }
    if (!value.orgName) {
      error.orgName = "Organization name is required.";
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
    if (!value.orgMebAgeFrom) {
      error.orgMebAgeFrom = "Member age from is required.";
    } else if (isNaN(value.orgMebAgeFrom)) {
      error.orgMebAgeFrom = "Member age from must be a number.";
    }
    if (!value.orgMebAgeTo) {
      error.orgMebAgeTo = "Member age to is required.";
    } else if (isNaN(value.orgMebAgeTo)) {
      error.orgMebAgeTo = "Member age to must be a number.";
    }

    return error;
  };
  const handleClick = () => {
    setFormError(validation(formValue, file));
    const errorData = validation(formValue, file);
    if (Object.keys(errorData)?.length === 0) {
      var formData = new FormData();
      formData.append("json_data", JSON.stringify(formValue));
      formData.append("orgLogo", file);
      createOrganization(formData);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      toast.success(data?.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (isError) {
      toast.error(createError?.data?.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isSuccess, isError, data, createError, setOpen]);
  return (
    <div>
      <div className="text-center mt-2">
        <h6>Create Organization</h6>
      </div>
      <div className=" p-2">
        <FormControl fullWidth className="mt-2">
          <TextField
            id="outlined-basic"
            label="Organization Name"
            variant="outlined"
            size="small"
            name="orgName"
            onChange={handleChange}
          />
          {formError?.orgName && (
            <FormHelperText error>{formError?.orgName}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth className="mt-4">
          <TextField
            id="outlined-basic"
            label="Organization Place"
            variant="outlined"
            size="small"
            name="orgPlace"
            onChange={handleChange}
          />
          {formError?.orgPlace && (
            <FormHelperText error>{formError?.orgPlace}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth className="mt-4">
          <TextField
            id="outlined-basic"
            label="Organization Address"
            variant="outlined"
            size="small"
            multiline
            rows={2}
            name="orgAddress"
            onChange={handleChange}
          />
          {formError?.orgAddress && (
            <FormHelperText error>{formError?.orgAddress}</FormHelperText>
          )}
        </FormControl>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth className="mt-4">
              <TextField
                id="outlined-basic"
                label="Year"
                variant="outlined"
                size="small"
                name="orgYear"
                onChange={handleChange}
                type="number"
              />
              {formError?.orgYear && (
                <FormHelperText error>{formError?.orgYear}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth className="mt-4">
              <TextField
                id="outlined-basic"
                label="Size"
                variant="outlined"
                size="small"
                name="orgMembersCount"
                onChange={handleChange}
                type="number"
              />
              {formError?.orgMembersCount && (
                <FormHelperText error>
                  {formError?.orgMembersCount}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <FormControl fullWidth className="mt-4">
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            size="small"
            multiline
            rows={2}
            name="orgDescription"
            onChange={handleChange}
          />
          {formError?.orgDescription && (
            <FormHelperText error>{formError?.orgDescription}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mt: 4 }}>
          <InputLabel htmlFor="upload-logo">Logo</InputLabel>
          <OutlinedInput
            id="upload-logo"
            type="file"
            label="Logo"
            size="small"
            inputProps={{
              accept: "image/*",
            }}
            onChange={handleFileChange}
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
          {formError?.fs && (
            <FormHelperText error>{formError?.fs}</FormHelperText>
          )}
          {preview && (
            <Box mt={2}>
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "contain",
                }}
              />
            </Box>
          )}
        </FormControl>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth className="mt-4">
              <TextField
                id="outlined-basic"
                label="Age Start"
                variant="outlined"
                size="small"
                name="orgMebAgeFrom"
                onChange={handleChange}
                type="number"
              />
              {formError?.orgMebAgeFrom && (
                <FormHelperText error>
                  {formError?.orgMebAgeFrom}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth className="mt-4">
              <TextField
                id="outlined-basic"
                label="Age End"
                variant="outlined"
                size="small"
                name="orgMebAgeTo"
                type="number"
                onChange={handleChange}
              />
              {formError?.orgMebAgeTo && (
                <FormHelperText error>{formError?.orgMebAgeTo}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <FormControl fullWidth className="mt-4">
          <Button
            variant="contained"
            size="large"
            className="p-3"
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
          >
            Create Organization
          </Button>
        </FormControl>
      </div>
    </div>
  );
};

export default CreateOrganization;
