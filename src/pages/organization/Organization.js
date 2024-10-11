import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectOrg } from "../../Server/Reducer/authSlice";
import UpdateOrganization from "../../components/Organization/UpdateOrganization";
import { CommonAlert } from "../../common/CommonAlert";
import OrgType from "../orgType/OrgType";

const Organization = () => {
  const getOrg = useSelector(selectOrg);
  const [formValue, setFormValue] = useState({});
  const [formError, setFormError] = useState({});

  // const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    setFormValue(getOrg);
  }, [getOrg]);

  const handleUpdateOrg = () => {
    const error = {};
    if (!formValue?.orgName) {
      error.orgName = "Organization Name is required!.";
    }
    if (!formValue?.orgDisplayName) {
      error.orgDisplayName = "Organization DisplayName is required!.";
    }
    if (!formValue?.orgPlace) {
      error.orgPlace = "Organization Place is required!.";
    }
    if (!formValue?.orgYear) {
      error.orgYear = "Organization Year is required!.";
    }
    if (!formValue?.orgMembersCount) {
      error.orgMembersCount = "Organization Member Count is required!.";
    }
    if (!formValue?.orgAddress) {
      error.orgAddress = "Organization Address is required!.";
    }
    // if (!formValue?.orgDescription) {
    //   error.orgDescription = "Organization Description is required!.";
    // }

    if (Object.keys(error)?.length === 0) {
    } else {
      setFormError(error);
      Object.keys(error)?.map((li) => CommonAlert(error[li], "error"));
    }
  };
  return (
    <div className="p-2 mb-5">
      <div className="card">
        <div className="card-header">
          <h5>Update Organization</h5>
        </div>
        <div className="card-body">
          <UpdateOrganization
            formValue={formValue}
            // setFile={setFile}
            setError={setError}
            error={error}
            setFormValue={setFormValue}
            formError={formError}
          />
        </div>
        <div className="card-footer text-end">
          <button
            className="btn btn-success"
            onClick={(e) => {
              e.preventDefault();
              handleUpdateOrg();
            }}
          >
            Update
          </button>
        </div>
      </div>
      <OrgType />
    </div>
  );
};

export default Organization;
