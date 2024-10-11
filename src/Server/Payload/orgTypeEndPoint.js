export const orgTypeEndpoints = (builder) => ({
  createOrgType: builder.mutation({
    query: (formData) => ({
      url: `/auth/orgType/create_orgType`,
      method: "POST",
      body: formData,
    }),
  }),
});
