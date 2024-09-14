export const memberRollEndpoints = (builder) => ({
  getAllOrgUser: builder.query({
    query: (id) => `/auth/user/org/${id}`,
  }),
});
