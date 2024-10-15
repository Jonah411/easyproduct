import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import Select from "react-select";
import { getMemberList, selectOrg } from "../../Server/Reducer/authSlice";
import {
  useCreateOrgTypeMutation,
  useGetAllOrgMemberQuery,
} from "../../Server/Reducer/authApi";
import moment from "moment";
import { CommonAlert } from "../../common/CommonAlert";
import { FormHelperText } from "@mui/material";
const OrgType = () => {
  const [createOrgType, { data, error: createError, isSuccess, isError }] =
    useCreateOrgTypeMutation();
  const orgData = useSelector(selectOrg);
  useGetAllOrgMemberQuery(orgData?._id, {
    refetchOnMountOrArgChange: true,
    skip: !orgData?._id,
  });
  const getMemberListData = useSelector(getMemberList);
  const [formValue, setFormValue] = useState({
    tName: "",
    tPlace: "",
    tYear: "",
    tStartAge: 1,
    tEndAge: 1,
    tAddress: "",
    tGender: "",
    tOrg: orgData?._id,
    tMember: [],
  });
  const [inputStatus, setInputStatus] = useState(true);
  const [memberList, setMemberList] = useState(true);
  const [selectYear, setSelectYear] = useState();
  const [formError, setFormError] = useState({});

  useEffect(() => {
    if (formValue?.tStartAge && formValue?.tEndAge && formValue?.tGender) {
      const filteredData = getMemberListData
        .filter(
          (item) =>
            item.age >= formValue?.tStartAge &&
            item.age <= formValue?.tEndAge &&
            (formValue?.tGender === "Both" ||
              item.gender === formValue?.tGender)
        )
        ?.map((li) => ({
          ...li,
          value: li?._id,
          label: li?.name,
        }));

      if (filteredData?.length !== 0) {
        setInputStatus(false);

        setMemberList((prevMemberList) => {
          const isSame =
            JSON.stringify(prevMemberList) === JSON.stringify(filteredData);
          if (!isSame) {
            return filteredData;
          }
          return prevMemberList;
        });
      } else {
        setInputStatus(true);
        setFormValue((prevFormValue) => ({
          ...prevFormValue,
          tMember: [],
        }));
      }
    } else {
      setInputStatus(true);
      setFormValue((prevFormValue) => ({
        ...prevFormValue,
        tMember: [],
      }));
    }
  }, [
    formValue?.tStartAge,
    formValue?.tEndAge,
    formValue?.tGender,
    getMemberListData,
  ]);
  const handleOrgTypeCreate = () => {
    const error = {};

    if (!formValue?.tName) {
      error.tName = "OrgType Name is required!.";
    }
    if (!formValue?.tPlace) {
      error.tPlace = "OrgType Place is required!.";
    }
    if (!formValue?.tYear) {
      error.tYear = "OrgType Year is required!.";
    }
    if (!formValue?.tGender) {
      error.tGender = "OrgType Gender is required!.";
    }
    if (!formValue?.tStartAge) {
      error.tStartAge = "OrgType Start Age is required!.";
    }
    if (!formValue?.tEndAge) {
      error.tEndAge = "OrgType End Age is required!.";
    }
    if (!formValue?.tAddress) {
      error.tAddress = "OrgType Address is required!.";
    }
    if (!formValue?.tMember || formValue?.tMember.length === 0) {
      error.tMember = "Please add at least one member!."; // Updated error message
    }

    if (Object?.keys(error)?.length === 0) {
      setFormError({});
      const newData = {
        ...formValue,
        tMember: formValue?.tMember?.map((li) => li?._id),
      };
      createOrgType(newData);
      console.log(newData, "formValue");
    } else {
      setFormError(error);
      Object?.keys(error)?.map((li) => CommonAlert(error[li], "error"));
    }
  };
  useEffect(() => {
    if (isSuccess) {
      CommonAlert(data?.msg, "success");
    }
    if (isError) {
      CommonAlert(createError?.data?.msg, "error");
    }
  }, [isSuccess, isError, data, createError]);
  return (
    <div className="card mt-2 mb-2">
      <div className="card-header">
        <h5>Create OrgType</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-3">
            <div className="mb-2">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                value={formValue?.tName}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    tName: e.target.value,
                  });
                }}
              />
              {formError?.tName && (
                <FormHelperText error>{formError?.tName}</FormHelperText>
              )}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-3">
            <label className="form-label">Place</label>
            <input
              className="form-control"
              value={formValue?.tPlace}
              onChange={(e) => {
                setFormValue({
                  ...formValue,
                  tPlace: e.target.value,
                });
              }}
            />
            {formError?.tPlace && (
              <FormHelperText error>{formError?.tPlace}</FormHelperText>
            )}
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-3">
            <label className="form-label">Year</label>
            <div className="w-100">
              <DatePicker
                style={{ width: "100%" }}
                className="form-control  text-muted"
                selected={selectYear}
                onChange={(e) => {
                  setSelectYear(e);
                  setFormValue({
                    ...formValue,
                    tYear: moment(e).format("yyyy"),
                  });
                }}
                showYearPicker
                dateFormat="yyyy"
              />
              {formError?.tYear && (
                <FormHelperText error>{formError?.tYear}</FormHelperText>
              )}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-3">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              value={formValue?.tGender}
              onChange={(e) => {
                setFormValue({
                  ...formValue,
                  tGender: e.target.value,
                });
              }}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Both">Both</option>
            </select>
            {formError?.tGender && (
              <FormHelperText error>{formError?.tGender}</FormHelperText>
            )}
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-3">
            <div className="mb-2">
              <label className="form-label">Start Age From</label>
              <input
                className="form-control"
                value={formValue?.tStartAge}
                type="number"
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    tStartAge: Number(e.target.value),
                  });
                }}
              />
              {formError?.tGender && (
                <FormHelperText error>{formError?.tStartAge}</FormHelperText>
              )}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-3">
            <div className="mb-2">
              <label className="form-label">End Age From</label>
              <input
                className="form-control"
                value={formValue?.tEndAge}
                type="number"
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    tEndAge: Number(e.target.value),
                  });
                }}
              />
              {formError?.tEndAge && (
                <FormHelperText error>{formError?.tEndAge}</FormHelperText>
              )}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <div className="mb-2">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                value={formValue?.tAddress}
                onChange={(e) => {
                  setFormValue({ ...formValue, tAddress: e.target.value });
                }}
              />
              {formError?.tAddress && (
                <FormHelperText error>{formError?.tAddress}</FormHelperText>
              )}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <div className="mb-2">
              <label className="form-label">Members List</label>
              <Select
                value={formValue?.tMember}
                isDisabled={inputStatus}
                onChange={(e) => setFormValue({ ...formValue, tMember: e })}
                options={memberList}
                isMulti
              />
              {formError?.tMember && (
                <FormHelperText error>{formError?.tMember}</FormHelperText>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="d-flex justify-content-end p-2">
          <button
            className="btn btn-sm btn-primary"
            onClick={(e) => {
              e.preventDefault();
              handleOrgTypeCreate();
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrgType;
