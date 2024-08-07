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
});
