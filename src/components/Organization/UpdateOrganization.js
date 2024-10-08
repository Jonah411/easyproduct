import React, { useState } from "react";
import { BASE_URL } from "../../common/ConstaltsVariables";
import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  FormHelperText,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DatePicker from "react-datepicker";
import moment from "moment/moment";

const UpdateOrganization = ({
  formValue,
  setFile,
  setError,
  error,
  setFormValue,
  formError,
}) => {
  const [selectedYear, setSelectedYear] = useState(new Date());
  const [preview, setPreview] = useState();
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
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
  const handleClear = () => {
    setFile(null);
    setPreview("");
  };
  const handleYearChange = (date) => {
    setSelectedYear(date);
    setFormValue({
      ...formValue,
      orgYear: Number(moment(date).format("YYYY")),
    });
  };
  const handleOrgChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    if (name === "orgMembersCount") {
      setFormValue({
        ...formValue,
        [name]: Number(value),
      });
    } else {
      setFormValue({
        ...formValue,
        [name]: value,
      });
    }
  };
  return (
    <div className="row">
      <div className="col-12 col-sm-12 col-md-6 col-lg-3">
        <div className="text-center">
          {preview ? (
            <img
              src={`${preview}`}
              width="30%"
              alt=""
              className="rounded mx-auto d-block img-thumbnail"
            />
          ) : (
            <img
              src={`${BASE_URL}/image/${formValue?.orgLogo}`}
              width="30%"
              alt=""
              className="rounded mx-auto d-block img-thumbnail"
            />
          )}
          <div className="mt-2">
            <OutlinedInput
              id="upload-logo"
              type="file"
              label="Logo"
              size="small"
              inputProps={{
                accept: "image/*",
              }}
              onChange={handleFileChange}
              //   disabled={statusOrg}
              startAdornment={
                <InputAdornment position="start">
                  <IconButton
                    component="label"
                    //   disabled={statusOrg}
                  >
                    <UploadIcon />
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </IconButton>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClear}
                    // disabled={statusOrg}
                    style={{ marginLeft: "8px" }}
                  >
                    X
                  </Button>
                </InputAdornment>
              }
            />
            {error && <FormHelperText error>{error}</FormHelperText>}
          </div>
        </div>
      </div>
      <div className="col-12 col-sm-12 col-md-6 col-lg-9">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-3">
            <div className="mb-2">
              <label className="fw-bold text-muted">Name:</label>
              <input
                name="orgName"
                className=" form-control mt-2 p-2 text-muted"
                value={formValue?.orgName}
                onChange={handleOrgChange}
              />
              {formError?.orgName && (
                <FormHelperText error>{formError?.orgName}</FormHelperText>
              )}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-3">
            <div className="mb-2">
              <label className="fw-bold text-muted">Display Name</label>
              <input
                name="orgDisplayName"
                className=" form-control mt-2 p-2 text-muted"
                value={formValue?.orgDisplayName}
                onChange={handleOrgChange}
              />
              {formError?.orgDisplayName && (
                <FormHelperText error>
                  {formError?.orgDisplayName}
                </FormHelperText>
              )}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-3">
            <div className="mb-2">
              <label className="fw-bold text-muted">Place</label>
              <input
                name="orgPlace"
                className=" form-control mt-2 p-2 text-muted"
                value={formValue?.orgPlace}
                onChange={handleOrgChange}
              />
              {formError?.orgPlace && (
                <FormHelperText error>{formError?.orgPlace}</FormHelperText>
              )}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-3">
            <div className="mb-2 row">
              <label className="fw-bold text-muted">Year/Count</label>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <DatePicker
                  className=" form-control mt-2 p-2 text-muted"
                  selected={selectedYear}
                  onChange={handleYearChange}
                  showYearPicker
                  dateFormat="yyyy"
                />
                {formError?.orgYear && (
                  <FormHelperText error>{formError?.orgYear}</FormHelperText>
                )}
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <input
                  name="orgMembersCount"
                  type="number"
                  className=" form-control mt-2 p-2 text-muted"
                  value={formValue?.orgMembersCount}
                  onChange={handleOrgChange}
                />
                {formError?.orgMembersCount && (
                  <FormHelperText error>
                    {formError?.orgMembersCount}
                  </FormHelperText>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <div className="mb-2">
              <label className="fw-bold text-muted">Address</label>
              <textarea
                name="orgAddress"
                className=" form-control mt-2 p-2 text-muted"
                value={formValue?.orgAddress}
                // maxLength={3}
                onChange={handleOrgChange}
              />
              {formError?.orgAddress && (
                <FormHelperText error>{formError?.orgAddress}</FormHelperText>
              )}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <div className="mb-2">
              <label className="fw-bold text-muted">Description</label>
              <textarea
                name="orgDescription"
                className=" form-control mt-2 p-2 text-muted"
                value={formValue?.orgDescription}
                // maxLength={2}
                onChange={handleOrgChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrganization;
