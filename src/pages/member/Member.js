import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectOrg } from "../../Server/Reducer/authSlice";
import { useGetAllOrgUserQuery } from "../../Server/Reducer/authApi";
import { getDecryptData } from "../../common/encrypt";
import { BASE_URL } from "../../common/ConstaltsVariables";

const Member = () => {
  const orgData = useSelector(selectOrg);
  const { data: orgDataString } = useGetAllOrgUserQuery(
    orgData ? orgData?._id : "",
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );
  const [memberList, setMemberList] = useState([]);
  useEffect(() => {
    if (orgDataString) {
      const rollDatas = getDecryptData(orgDataString?.data);
      setMemberList(JSON.parse(rollDatas));
    }
  }, [orgDataString]);
  console.log(memberList);

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
                    <th>Image</th>
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
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
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

export default Member;
