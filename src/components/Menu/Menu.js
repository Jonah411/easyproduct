import React, { useEffect, useState } from "react";
import { CommonAlert } from "../../common/CommonAlert";
import { useCreateMenuMutation } from "../../Server/Reducer/authApi";
import { getDecryptData } from "../../common/encrypt";
import { useSelector } from "react-redux";
import {
  getMenuList,
  getRouteList,
  selectOrg,
} from "../../Server/Reducer/authSlice";
import Select from "react-select";
import { Box, FormHelperText, InputLabel, OutlinedInput } from "@mui/material";

const Menu = ({ refetch, setMenuList }) => {
  const orgId = useSelector(selectOrg);
  const routeList = useSelector(getRouteList);
  const menuDataString = useSelector(getMenuList);
  const [createmenu, { data, error: createError, isSuccess, isError }] =
    useCreateMenuMutation();
  const [formMenu, setFormMenu] = useState({
    mName: "",
    mLocationPath: "",
    mIcon: "",
    mService: "",
  });
  const [formError, setFormError] = useState({});
  const [selectMName, setSelectMName] = useState([]);
  const [selectMlocationPath, setSelectMLocationPath] = useState([]);

  useEffect(() => {
    if (menuDataString) {
      const filteredRoutes = routeList.filter(
        (route) =>
          !menuDataString.some((menuItem) => menuItem.mName === route.cName)
      );

      setSelectMName(filteredRoutes);
    }
  }, [menuDataString, routeList]);
  const handleMenuChange = (e) => {
    const { name, value } = e.target;
    setFormMenu({ ...formMenu, [name]: value });
  };

  const handleMenuClick = () => {
    const error = {};
    if (!formMenu?.mName) {
      error.mName = "Menu Name Is Required!.";
    }
    if (!formMenu?.mLocationPath) {
      error.mLocationPath = "Menu Location Is Required!.";
    }
    // if (!formMenu?.mIcon) {
    //   error.mIcon = "Menu Icon Is Required!.";
    // }
    if (Object.keys(error)?.length === 0) {
      // createmenu({ ...formMenu, mOrg: orgId?._id });
      var formData = new FormData();
      formData.append(
        "json_data",
        JSON.stringify({ ...formMenu, mOrg: orgId?._id })
      );
      formData.append("menuImage", file);
      createmenu(formData);
      refetch();
    } else {
      setFormError(error);
      Object.keys(error)?.map((li) => CommonAlert(error[li], "error"));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      CommonAlert(data?.message, "success");
      setFormMenu({ mName: "", mLocationPath: "", mIcon: "" });
      const userDatas = getDecryptData(data?.data);
      setMenuList(JSON.parse(userDatas));
    }
    if (isError) {
      CommonAlert(createError?.data?.msg, "error");
    }
  }, [isSuccess, isError, data, createError, setMenuList]);

  const [error, setError] = useState();
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

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
    <div className="p-2">
      <div className="card">
        <div className="card-header">Menu Creation</div>
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-4 col-lg-2">
              <div className="mt-2">
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
                  // disabled={statusOrg}
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
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-10">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                  <Select
                    className="form-control "
                    // value={selectMName}
                    onChange={(e) => {
                      setFormMenu({ ...formMenu, mName: e[0]?.cName });
                      setSelectMLocationPath(e);
                    }}
                    options={selectMName?.map((li) => {
                      return {
                        ...li,
                        label: li?.cName,
                        value: li?.cName,
                      };
                    })}
                    isMulti
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                  <Select
                    className="form-control "
                    // value={selectMlocationPath}
                    onChange={(e) =>
                      setFormMenu({
                        ...formMenu,
                        mLocationPath: e?.cLocationPath,
                      })
                    }
                    options={selectMlocationPath?.map((li) => {
                      return {
                        ...li,
                        label: li?.cLocationPath,
                        value: li?.cLocationPath,
                      };
                    })}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                  <Select
                    className="form-control "
                    // value={selectMName}
                    onChange={(e) => {
                      setFormMenu({ ...formMenu, mService: e?.value });
                      // setSelectMLocationPath(e);
                    }}
                    options={[
                      { label: "Web", value: "Web" },
                      { label: "Mobile", value: "Mobile" },
                    ]}
                    // isMulti
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                  <input
                    className="form-control mt-2"
                    placeholder="Menu Icon"
                    name="mIcon"
                    onChange={handleMenuChange}
                    style={{
                      border: formError?.mIcon
                        ? !formMenu?.mIcon && "red 1px solid"
                        : "",
                    }}
                  />
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-4 d-grid">
                  <button
                    className="btn btn-sm btn-success mt-2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
