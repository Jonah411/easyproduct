import React, { useEffect, useState } from "react";
// import OrgPosition from "../../components/Position/OrgPosition";
import CreatePosition from "../../components/Position/CreatePosition";
import { useSelector } from "react-redux";
import {
  getMemberList,
  getOrgPosList,
  selectOrg,
} from "../../Server/Reducer/authSlice";
import {
  useCreatePositionMutation,
  useDeletePositionMutation,
  useGetAllOrgMemberQuery,
  useGetAllOrgPositionQuery,
  useUpdatePositionMutation,
} from "../../Server/Reducer/authApi";
import { CommonAlert } from "../../common/CommonAlert";

const Position = () => {
  const orgData = useSelector(selectOrg);
  const memberList = useSelector(getMemberList);
  const orgPosList = useSelector(getOrgPosList);
  useGetAllOrgMemberQuery(orgData ? orgData?._id : "", {
    refetchOnMountOrArgChange: true,
    skip: !orgData?._id,
  });
  useGetAllOrgPositionQuery(orgData ? orgData?._id : "", {
    refetchOnMountOrArgChange: true,
    skip: !orgData?._id,
  });
  const [createPosition, { data, error: createError, isSuccess, isError }] =
    useCreatePositionMutation();
  const [
    deletePosition,
    {
      data: deleteData,
      error: deleteError,
      isSuccess: deleteIsSuccess,
      isError: deleteIsError,
    },
  ] = useDeletePositionMutation();
  const [
    updatePosition,
    {
      data: updateData,
      error: updateError,
      isSuccess: updateIsSuccess,
      isError: updateIsError,
    },
  ] = useUpdatePositionMutation();
  const [mList, setMList] = useState([]);
  const [selectMList, setSelectMList] = useState([]);
  const [positionList, setPositionList] = useState([]);
  useEffect(() => {
    if (memberList?.length !== 0) {
      const newMember = memberList?.map((li) => {
        return {
          ...li,
          value: li?._id,
          label: `${li?.name}-${li?.memberId}`,
        };
      });

      setMList(newMember);
    } else {
      setMList([]);
    }
  }, [memberList]);

  const [pFormValues, setPFormValues] = useState({
    orgName: "",
    orgId: "",
    pName: "",
    pCount: 0,
    pMember: [],
  });
  const [formError, setFormError] = useState({});
  useEffect(() => {
    setPFormValues({
      pName: "",
      pCount: 0,
      pMember: [],
      orgName: orgData?.orgName,
      orgId: orgData?._id,
    });
  }, [orgData]);

  const handlePositionClick = (e) => {
    e.preventDefault();
    const error = {};
    if (!pFormValues?.pName) {
      error.pName = "Position Name is Required!.";
    }
    if (!pFormValues?.pCount) {
      error.pCount = "Position Count is Required!.";
    }
    if (pFormValues?.pMember?.length === 0) {
      error.pMember = "Please Select Member";
    }
    if (Object.keys(error).length === 0) {
      createPosition(pFormValues);
    } else {
      setFormError(error);
      Object.keys(error)?.map((li) => CommonAlert(error[li], "error"));
    }
  };
  useEffect(() => {
    if (isSuccess) {
      CommonAlert(data?.msg, "success");
      setPFormValues({
        pName: "",
        pCount: 0,
        pMember: [],
        orgName: orgData?.orgName,
        orgId: orgData?._id,
      });
      setSelectMList([]);
    }
    if (isError) {
      CommonAlert(createError?.data?.msg, "error");
      setPFormValues({
        pName: "",
        pCount: 0,
        pMember: [],
        orgName: orgData?.orgName,
        orgId: orgData?._id,
      });
      setSelectMList([]);
    }
  }, [isSuccess, isError, data, createError, orgData]);

  useEffect(() => {
    if (orgPosList?.Position?.length !== 0) {
      setPositionList(orgPosList?.Position);
    } else {
      setPositionList([]);
    }
  }, [orgPosList?.Position]);

  const handlePositionChange = (e, positionId) => {
    const { name, value } = e.target;
    if (positionId) {
      setPositionList((prevList) =>
        prevList?.map((li) => {
          if (li?._id === positionId) {
            return {
              ...li,
              [name]: value,
            };
          } else {
            return { ...li };
          }
        })
      );
    } else {
      setPFormValues({ ...pFormValues, [name]: value });
    }
  };

  const hasEmptyFields = (positions) => {
    return positions.some((position) => {
      const { pName, pCount, Organization, pMember } = position;

      return (
        !pName ||
        pCount === undefined ||
        pCount === null ||
        !Organization ||
        !Array.isArray(pMember) ||
        pMember.length === 0
      );
    });
  };

  const handlePositionListClick = (e) => {
    e.preventDefault();
    const bodyData = positionList?.map((li) => {
      return {
        ...li,
        pMember: li?.pMember?.map((mem) => mem?._id),
      };
    });
    const result = hasEmptyFields(bodyData);
    if (result) {
      CommonAlert(
        "One or more fields are empty. Please check the data.",
        "error"
      );
    } else {
      updatePosition(bodyData);
      console.log(bodyData);
    }
  };

  useEffect(() => {
    if (updateIsSuccess) {
      CommonAlert(updateData?.msg, "success");
      setPFormValues({
        pName: "",
        pCount: 0,
        pMember: [],
        orgName: orgData?.orgName,
        orgId: orgData?._id,
      });
      setSelectMList([]);
    }
    if (updateIsError) {
      CommonAlert(updateError?.data?.msg, "error");
      setPFormValues({
        pName: "",
        pCount: 0,
        pMember: [],
        orgName: orgData?.orgName,
        orgId: orgData?._id,
      });
      setSelectMList([]);
    }
  }, [updateIsSuccess, updateIsError, updateData, updateError, orgData]);

  const handleRemoveClick = (e, id) => {
    e.preventDefault();
    console.log(id, "ididididi");

    deletePosition(id).unwrap();
  };

  useEffect(() => {
    if (deleteIsSuccess) {
      CommonAlert(deleteData?.msg, "success");
      setPFormValues({
        pName: "",
        pCount: 0,
        pMember: [],
        orgName: orgData?.orgName,
        orgId: orgData?._id,
      });
      setSelectMList([]);
    }
    if (deleteIsError) {
      CommonAlert(deleteError?.data?.msg, "error");
      setPFormValues({
        pName: "",
        pCount: 0,
        pMember: [],
        orgName: orgData?.orgName,
        orgId: orgData?._id,
      });
      setSelectMList([]);
    }
  }, [deleteIsError, deleteIsSuccess, deleteData, deleteError, orgData]);

  return (
    <div className="p-2 mb-3">
      <div className="card">
        <div className="card-header">
          <h6>Create Position</h6>
        </div>
        <div className="card-body m-0 p-0">
          <CreatePosition
            mList={pFormValues?.pCount > selectMList?.length ? mList : []}
            pFormValues={pFormValues}
            setPFormValues={setPFormValues}
            handlePositionClick={handlePositionClick}
            formError={formError}
            setSelectMList={setSelectMList}
            selectMList={selectMList}
            handlePositionChange={handlePositionChange}
            positionList={positionList}
          />
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-sm btn-success"
              onClick={(e) => handlePositionClick(e)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="card mt-2 mb-5">
        <div className="card-header">
          <h6>Position List</h6>
        </div>
        <div className="card-body m-0 p-0">
          {positionList?.map((position) => {
            const mOption = position?.pMember?.map((li) => {
              return {
                ...li,
                value: li?._id,
                label: `${li?.name}-${li?.memberId}`,
              };
            });
            // setSelectMList(mOption);
            return (
              <CreatePosition
                mList={position?.pCount > mOption?.length ? mList : []}
                pFormValues={position}
                setPFormValues={setPFormValues}
                handlePositionClick={handlePositionClick}
                formError={formError}
                positionId={position?._id}
                mOption={mOption}
                handlePositionChange={handlePositionChange}
                positionList={positionList}
                handleRemoveClick={handleRemoveClick}
              />
            );
          })}
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-sm btn-success"
              onClick={(e) => handlePositionListClick(e)}
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* <OrgPosition /> */}
    </div>
  );
};

export default Position;
