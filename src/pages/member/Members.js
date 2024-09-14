import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectOrg } from "../../Server/Reducer/authSlice";
import { useGetAllOrgUserQuery } from "../../Server/Reducer/authApi";
import { getDecryptData } from "../../common/encrypt";
import { BASE_URL } from "../../common/ConstaltsVariables";
import { useNavigate } from "react-router-dom";

const Members = () => {
  const orgData = useSelector(selectOrg);
  const { data: memberDataString } = useGetAllOrgUserQuery(
    orgData ? orgData?._id : "",
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );
  const [memberList, setMemberList] = useState([]);
  useEffect(() => {
    if (memberDataString) {
      const rollDatas = getDecryptData(memberDataString?.data);
      setMemberList(JSON.parse(rollDatas));
    }
  }, [memberDataString]);
  const navigate = useNavigate();

  return (
    <div className="p-2 mb-5">
      <div className="card mb-5">
        <div className="card-header">Member View</div>
        <div className="card-body">
          <div className="table-responsive">
            <div className="table-responsive table-wrapper">
              <table className="table table-bordered table-hover wo-table m-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Ph.No</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Roll</th>
                    <th>Members Count</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {memberList?.length !== 0 ? (
                    memberList?.map((li) => {
                      return (
                        <tr key={li?._id}>
                          <td>{li.name}</td>
                          <td>{li.age}</td>
                          <td>{li.gender}</td>
                          <td>{li.phoneNo}</td>
                          <td>{li.email}</td>
                          <td>{li.userAddress}</td>
                          <td>{li.Roll?.rName}</td>
                          <td>{li.memberCount}</td>
                          <td>
                            {
                              <img
                                src={`${BASE_URL}/image/${li?.userImage}`}
                                alt={li?.userImage}
                                className="text-center roundedCircle  mt-0 mb-0"
                                width={50}
                              />
                            }
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => {
                                navigate("/app/members_group", {
                                  state: li,
                                });
                              }}
                            >
                              Add/Update
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={9}
                        className="text-center fw-bold text-danger"
                      >
                        No Data!.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
