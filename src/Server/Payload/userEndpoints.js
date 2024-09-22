import { getDecryptData } from "../../common/encrypt";
import { createOrgList, createRouteList } from "../Reducer/authSlice";

export const userEndpoints = (builder) => ({
  getAllOrg: builder.query({
    query: () => `/org/getorg`,
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        dispatch(createOrgList(data?.data));
      } catch (err) {
        console.error("Fetching rolls failed: ", err);
      }
    },
  }),
  createOrganization: builder.mutation({
    query: (formData) => ({
      url: `/org/createorg`,
      method: "POST",
      body: formData,
    }),
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        if (data?.success) {
          dispatch(createOrgList(data?.data?.organization));
        }
      } catch (err) {
        console.error("Fetching rolls failed: ", err);
      }
    },
  }),
  getUser: builder.query({
    query: (id) => `/user/${id}`,
  }),
  getSingleUser: builder.query({
    query: (id) => `/auth/user/${id}`,
  }),
  getRoutesData: builder.query({
    query: (id) => `/auth/components/${id}`,
    async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;

        if (data?.isSuccess) {
          const { data } = await queryFulfilled;
          const routesDatas = getDecryptData(data?.data);
          console.log(JSON.parse(routesDatas));

          dispatch(createRouteList(JSON.parse(routesDatas)));
        } else {
          dispatch(createRouteList([]));
        }
      } catch (err) {
        console.error("Fetching rolls failed: ", err);
      }
    },
  }),
});
