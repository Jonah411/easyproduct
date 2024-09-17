import { createOrgList } from "../Reducer/authSlice";

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
});
