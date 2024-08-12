export const userEndpoints = (builder) => ({
  getAllOrg: builder.query({
    query: () => `/org/getorg`,
  }),
  createOrganization: builder.mutation({
    query: (formData) => ({
      url: `/org/createorg`,
      method: "POST",
      body: formData,
    }),
  }),
  getUser: builder.query({
    query: (id) => `/user/${id}`,
  }),
  getSingleUser: builder.query({
    query: (id) => `/auth/user/${id}`,
  }),
});
