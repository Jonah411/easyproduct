import { getDecryptData } from "../../common/encrypt";
import { authApi } from "../Reducer/authApi";
import {
  createMemberGroupList,
  createMemberList,
  createOrgPositionList,
  createUserList,
} from "../Reducer/authSlice";

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
  getAllOrgMember: builder.query({
    query: (data) => `/auth/member/get_member/${data}`,
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        const userDatas = getDecryptData(data?.data);
        const groupList = JSON.parse(userDatas);
        dispatch(createMemberList(groupList));
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
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        const memberDatas = getDecryptData(data?.data);
        const groupList = JSON.parse(memberDatas);
        dispatch(createMemberGroupList(groupList));
      } catch (err) {
        console.error("Fetching rolls failed: ", err);
      }
    },
  }),
  createPosition: builder.mutation({
    query: (formData) => ({
      url: `/auth/position/createposition`,
      method: "POST",
      body: formData,
    }),
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        const orgPosDatas = getDecryptData(data?.data);
        const groupList = JSON.parse(orgPosDatas);
        dispatch(createOrgPositionList(groupList));
      } catch (err) {
        console.error("Fetching rolls failed: ", err);
      }
    },
  }),
  updatePosition: builder.mutation({
    query: (formData) => ({
      url: `/auth/position/updateposition`,
      method: "PUT",
      body: formData,
    }),
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        const orgPosDatas = getDecryptData(data?.data);
        const groupList = JSON.parse(orgPosDatas);
        dispatch(createOrgPositionList(groupList));
      } catch (err) {
        console.error("Fetching rolls failed: ", err);
      }
    },
  }),
  deletePosition: builder.mutation({
    query: (positionId) => ({
      url: `/auth/position/removeposition/${positionId}`,
      method: "DELETE",
    }),
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        const orgPosDatas = getDecryptData(data?.data);
        const groupList = JSON.parse(orgPosDatas);
        dispatch(createOrgPositionList(groupList));
      } catch (err) {
        console.error("Fetching rolls failed: ", err);
      }
    },
  }),
  getAllOrgPosition: builder.query({
    query: (id) => `/auth/position/getposition/${id}`,
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        const orgPosDatas = getDecryptData(data?.data);
        const groupList = JSON.parse(orgPosDatas);
        dispatch(createOrgPositionList(groupList));
      } catch (err) {
        console.error("Fetching rolls failed: ", err);
      }
    },
  }),
  createUserMember: builder.mutation({
    query: (formData) => ({
      url: `/auth/user/createuser`,
      method: "POST",
      body: formData,
    }),
  }),
});
