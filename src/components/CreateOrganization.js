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
import React from "react";
import { BASE_URL } from "../common/ConstaltsVariables";

const CreateOrganization = ({
  setFormValue,
  formValue,
  setFile,
  setError,
  error,
  setPreview,
  preview,
  formError,
  handleClick,
  statusOrg,
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
            value={formValue?.orgName}
            disabled={statusOrg}
          />
          {formError?.orgName && (
            <FormHelperText error>{formError?.orgName}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth className="mt-2">
          <TextField
            id="outlined-basic"
            label="Organization Display Name"
            variant="outlined"
            size="small"
            name="orgDisplayName"
            onChange={handleChange}
            value={formValue?.orgDisplayName}
            disabled={statusOrg}
          />
          {formError?.orgDisplayName && (
            <FormHelperText error>{formError?.orgDisplayName}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth className="mt-2">
          <TextField
            id="outlined-basic"
            label="Organization Place"
            variant="outlined"
            size="small"
            name="orgPlace"
            onChange={handleChange}
            value={formValue?.orgPlace}
            disabled={statusOrg}
          />
          {formError?.orgPlace && (
            <FormHelperText error>{formError?.orgPlace}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth className="mt-2">
          <TextField
            id="outlined-basic"
            label="Organization Address"
            variant="outlined"
            size="small"
            multiline
            rows={2}
            name="orgAddress"
            onChange={handleChange}
            value={formValue?.orgAddress}
            disabled={statusOrg}
          />
          {formError?.orgAddress && (
            <FormHelperText error>{formError?.orgAddress}</FormHelperText>
          )}
        </FormControl>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth className="mt-2">
              <TextField
                id="outlined-basic"
                label="Year"
                variant="outlined"
                size="small"
                name="orgYear"
                onChange={handleChange}
                type="number"
                value={formValue?.orgYear}
                disabled={statusOrg}
              />
              {formError?.orgYear && (
                <FormHelperText error>{formError?.orgYear}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth className="mt-2">
              <TextField
                id="outlined-basic"
                label="Size"
                variant="outlined"
                size="small"
                name="orgMembersCount"
                onChange={handleChange}
                type="number"
                value={formValue?.orgMembersCount}
                disabled={statusOrg}
              />
              {formError?.orgMembersCount && (
                <FormHelperText error>
                  {formError?.orgMembersCount}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <FormControl fullWidth className="mt-2">
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            size="small"
            multiline
            rows={2}
            name="orgDescription"
            onChange={handleChange}
            value={formValue?.orgDescription}
            disabled={statusOrg}
          />
          {formError?.orgDescription && (
            <FormHelperText error>{formError?.orgDescription}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mt: 4 }}>
          {statusOrg ? (
            ""
          ) : (
            <>
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
                disabled={statusOrg}
              />
            </>
          )}

          {error && <FormHelperText error>{error}</FormHelperText>}
          {formError?.fs && (
            <FormHelperText error>{formError?.fs}</FormHelperText>
          )}
          {statusOrg ? (
            <div>
              <img
                src={`${BASE_URL}/image/${preview}`}
                width="30%"
                alt=""
                className="rounded mx-auto d-block img-thumbnail"
              />
            </div>
          ) : (
            <div>
              {" "}
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
            </div>
          )}
        </FormControl>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth className="mt-2">
              <TextField
                id="outlined-basic"
                label="Age Start"
                variant="outlined"
                size="small"
                name="orgMebAgeFrom"
                onChange={handleChange}
                type="number"
                value={formValue?.orgMebAgeFrom}
                disabled={statusOrg}
              />
              {formError?.orgMebAgeFrom && (
                <FormHelperText error>
                  {formError?.orgMebAgeFrom}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth className="mt-2">
              <TextField
                id="outlined-basic"
                label="Age End"
                variant="outlined"
                size="small"
                name="orgMebAgeTo"
                type="number"
                onChange={handleChange}
                value={formValue?.orgMebAgeTo}
                disabled={statusOrg}
              />
              {formError?.orgMebAgeTo && (
                <FormHelperText error>{formError?.orgMebAgeTo}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <FormControl fullWidth className="mt-2">
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
