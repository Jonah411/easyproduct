import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userEndpoints } from "../Payload/userEndpoints";

const combinedEndpoints = (builder) => ({
  ...userEndpoints(builder),
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/app" }),
  endpoints: combinedEndpoints,
});

export const { useGetAllOrgQuery, useCreateOrganizationMutation } = authApi;
