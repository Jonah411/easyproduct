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
  });
  const [formError, setFormError] = useState({});
  const [selectMName, setSelectMName] = useState([]);
  const [selectMlocationPath, setSelectMLocationPath] = useState([]);

  useEffect(() => {
    if (menuDataString) {
      console.log(menuDataString, routeList);

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
    if (!formMenu?.mIcon) {
      error.mIcon = "Menu Icon Is Required!.";
    }
    if (Object.keys(error)?.length === 0) {
      createmenu({ ...formMenu, mOrg: orgId?._id });

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

  return (
    <div className="p-2">
      <div className="card">
        <div className="card-header">Menu Creation</div>
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-3">
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
            <div className="col-12 col-sm-12 col-md-6 col-lg-3">
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
            <div className="col-12 col-sm-12 col-md-6 col-lg-3">
              <input
                className="form-control "
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
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 d-grid">
              <button
                className="btn btn-sm btn-success"
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
  );
};

export default Menu;
