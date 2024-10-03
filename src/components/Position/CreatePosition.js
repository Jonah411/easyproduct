import React, { useEffect, useState } from "react";
import Select from "react-select";

const CreatePosition = ({
  mList,
  pFormValues,
  handlePositionChange,
  formError,
  setSelectMList,
  selectMList,
  positionId,
  mOption,
  positionList,
  handleRemoveClick,
}) => {
  const [selectMember, setSelectMember] = useState([]);

  useEffect(() => {
    if (mOption?.length !== 0) {
      setSelectMember(mOption);
      // setSelectMList(mOption);
    } else {
      setSelectMember([]);
    }
  }, [mOption]);
  useEffect(() => {
    if (selectMList?.length !== 0 && !positionId) {
      setSelectMember(selectMList);
    } else {
      setSelectMember(mOption);
    }
  }, [selectMList, setSelectMember, positionId, mOption]);
  return (
    <div className="row m-2">
      <div className="col-12 col-sm-12 col-md-6 col-lg-3">
        <input
          className="form-control"
          name="pName"
          value={pFormValues?.pName}
          onChange={(e) => handlePositionChange(e, positionId)}
        />
        {formError.pName && !pFormValues?.pName && (
          <p className="text-danger">{formError.pName}</p>
        )}
      </div>
      <div className="col-12 col-sm-12 col-md-6 col-lg-2">
        <input
          className="form-control"
          type="number"
          value={pFormValues?.pCount ? pFormValues?.pCount : ""}
          name="pCount"
          onChange={(e) => handlePositionChange(e, positionId)}
        />
        {formError.pCount ? (
          !pFormValues?.pCount ? (
            <p className="text-danger">{formError.pCount}</p>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
      <div className="col-12 col-sm-12 col-md-6 col-lg-3">
        <Select
          value={selectMember}
          onChange={(e) => {
            if (positionId) {
              const data = {
                target: {
                  name: "pMember",
                  value: e,
                },
              };
              handlePositionChange(data, positionId);
            } else {
              setSelectMList(e);
              const data = {
                target: {
                  name: "pMember",
                  value: e?.map((li) => li?._id),
                },
              };
              handlePositionChange(data, positionId);
            }
          }}
          options={mList?.map((li) => {
            return {
              ...li,
              isDisabled: positionList
                ?.map((group) => group.pMember)
                .flat()
                ?.some((mem) => li?._id === mem?._id),
            };
          })}
          isMulti
          isDisabled={!pFormValues?.pCount}
        />
        {formError.pMember && pFormValues?.pMember?.length === 0 && (
          <p className="text-danger">{formError.pMember}</p>
        )}
      </div>
      {positionId ? (
        <>
          <div className="col-12 col-sm-12 col-md-6 col-lg-3">
            <input
              className="form-control"
              value={pFormValues?.positionId}
              readOnly
            />
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-1">
            <div className="d-grid  p-1">
              <button
                className="btn btn-sm btn-danger"
                onClick={(e) => handleRemoveClick(e, pFormValues?._id)}
              >
                X
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="col-12 col-sm-12 col-md-6 col-lg-3">
          <input
            className="form-control"
            value={pFormValues?.orgName}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default CreatePosition;
