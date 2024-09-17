import { getDecryptData } from "../../common/encrypt";
import { authApi } from "../Reducer/authApi";
import { createMemberGroupList, createUserList } from "../Reducer/authSlice";

export const memberRollEndpoints = (builder) => ({
  getAllOrgUser: builder.query({
    query: (id) => `/auth/user/org/${id}`,
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        const userDatas = getDecryptData(data?.data);
        const groupList = JSON.parse(userDatas);
        dispatch(createUserList(groupList));
      } catch (err) {
        console.error("Fetching rolls failed: ", err);
      }
    },
  }),
  getAllOrgUserMember: builder.query({
    query: (data) =>
      `/auth/member/get_member/${data?.Organization?._id}/${data?._id}`,
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        const userData = arg;
        const user = {
          orgId: userData?.Organization?._id,
          userId: userData?._id,
          rollId: userData?.Roll?._id,
          name: userData?.name,
          age: userData?.age,
          gender: userData?.gender,
          email: userData?.email,
          phoneNo: userData?.phoneNo,
          password: userData?.password,
          encPassword: userData?.password,
          userAddress: userData?.userAddress,
          mImageFileName: userData?.userImage,
        };
        const rollDatas = getDecryptData(data?.data);
        const groupList = JSON.parse(rollDatas);
        console.log(groupList);
        if (groupList?.length === 0) {
          var formData = new FormData();
          formData.append("json_data", JSON.stringify(user));
          dispatch(authApi.endpoints.createMember.initiate(formData)).then(
            (res) => {
              if (res?.data?.status) {
                const memberDatas = getDecryptData(res?.data?.data);
                const groupList = JSON.parse(memberDatas);
                dispatch(createMemberGroupList(groupList));
              } else {
                dispatch(createMemberGroupList([]));
              }
            }
          );
        } else {
          dispatch(createMemberGroupList(groupList));
        }
        // console.log(arg, data, groupList);
      } catch (err) {
        console.error("Fetching rolls failed: ", err);
      }
    },
  }),
  createMember: builder.mutation({
    query: (formData) => ({
      url: `/auth/member/create_member`,
      method: "POST",
      body: formData,
    }),
  }),
  createUserMember: builder.mutation({
    query: (formData) => ({
      url: `/auth/user/createuser`,
      method: "POST",
      body: formData,
    }),
  }),
});
