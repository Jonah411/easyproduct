import React, { useEffect, useState } from "react";
import { useUpdateAllRollMutation } from "../../Server/Reducer/authApi";
import { getDecryptData } from "../../common/encrypt";
import { Accordion } from "react-bootstrap";
import Select from "react-select";
import { CommonAlert } from "../../common/CommonAlert";
import { useDispatch, useSelector } from "react-redux";
import { createRollList, getRollList } from "../../Server/Reducer/authSlice";

const RollAccess = ({ menuDataString, menuList, setMenuList }) => {
  const rollDataString = useSelector(getRollList);

  const [UpdateAllRoll, { data, error: createError, isSuccess, isError }] =
    useUpdateAllRollMutation();
  const dispatch = useDispatch();
  const [rollList, setRollList] = useState([]);

  useEffect(() => {
    if (rollDataString) {
      setRollList(rollDataString);
    }
    if (menuDataString) {
      const menuDatas = getDecryptData(menuDataString?.data);
      setMenuList(JSON.parse(menuDatas));
    }
  }, [rollDataString, menuDataString, setMenuList]);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const optionsData = menuList?.map((li) => {
      return {
        ...li,
        value: li?._id,
        label: li?.mName,
      };
    });
    setOptions(optionsData);
  }, [menuList]);
  useEffect(() => {
    if (isSuccess) {
      const userDatas = getDecryptData(data?.data);
      setRollList(JSON.parse(userDatas));
      dispatch(createRollList(JSON.parse(userDatas)));
      CommonAlert(data?.message, "success");
    }
    if (isError) {
      CommonAlert(createError?.data?.msg, "error");
    }
  }, [isSuccess, isError, data, createError, dispatch]);
  const handleMenuChange = (e, roll) => {
    setRollList((prevList) =>
      prevList?.map((li) => {
        if (li?._id === roll?._id) {
          return {
            ...li,
            rMenu: e,
          };
        } else {
          return {
            ...li,
          };
        }
      })
    );
  };
  const handleRollAccessClick = () => {
    const newList = rollList?.map((li) => {
      return {
        ...li,
        rMenu: li?.rMenu?.map((menu) => menu?._id),
      };
    });
    UpdateAllRoll(newList);
  };
  return (
    <div className="p-2 mb-5">
      <div className="card mb-5">
        <div className="card-header">Roll Menu Access</div>
        <div className="card-body">
          <Accordion defaultActiveKey="0" alwaysOpen={true}>
            {rollList?.map((roll) => {
              const selectedOption = roll?.rMenu?.map((li) => {
                return {
                  ...li,
                  value: li?._id,
                  label: li?.mName,
                };
              });
              return (
                <Accordion.Item key={roll?._id}>
                  <Accordion.Header>{roll?.rName}</Accordion.Header>
                  <Accordion.Body>
                    <Select
                      value={selectedOption}
                      onChange={(e) => handleMenuChange(e, roll)}
                      options={options}
                      isMulti
                    />
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-sm btn-success"
              onClick={(e) => {
                e.preventDefault();
                handleRollAccessClick();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RollAccess;
