import { getDecryptData } from "../../common/encrypt";
import { createRollList } from "../Reducer/authSlice";

export const menuRollEndpoints = (builder) => ({
  createMenu: builder.mutation({
    query: (formData) => ({
      url: `/auth/menu/createmenu`,
      method: "POST",
      body: formData,
    }),
  }),
  getAllRoll: builder.query({
    query: (orgId) => `/auth/menu/getallrolls/${orgId}`,
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        const userDatas = getDecryptData(data?.data);

        dispatch(createRollList(JSON.parse(userDatas)));
      } catch (err) {
        console.error("Fetching rolls failed: ", err);
      }
    },
  }),
  getAllMenu: builder.query({
    query: () => "/auth/menu/getallmenus",
  }),
  UpdateAllRoll: builder.mutation({
    query: (formData) => ({
      url: `/auth/menu/updateallroll`,
      method: "POST",
      body: formData,
    }),
  }),
});
