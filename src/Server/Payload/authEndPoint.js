import {
  setToken,
  setRefreshToken,
  orgData,
  rollData,
  userData,
} from "../Reducer/authSlice";

export const authEndpoints = (builder) => ({
  login: builder.mutation({
    query: (user) => ({
      url: "/auth/login",
      method: "POST",
      body: user,
    }),
    onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
      try {
        const { data } = await queryFulfilled;
        dispatch(setToken(data?.data?.token));
        dispatch(setRefreshToken(data?.data?.refreshToken));
        dispatch(orgData(data?.data?.userData?.Organization));
        dispatch(rollData(data?.data?.userData?.Roll));
        dispatch(
          userData({
            _id: data?.data?.userData?.User
              ? data?.data?.userData?.User
              : data?.data?.userData?._id,
            name: data?.data?.userData?.name,
            email: data?.data?.userData?.email,
            gender: data?.data?.userData?.gender,
            phoneNo: data?.data?.userData?.phoneNo,
          })
        );
      } catch (err) {
        console.error("Login failed: ", err);
      }
    },
  }),
  logout: builder.query({
    query: () => `/auth/logout`,
  }),
});
