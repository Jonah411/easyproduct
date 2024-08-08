import { setToken, setRefreshToken } from "../Reducer/authSlice";

export const authEndpoints = (builder) => ({
  login: builder.mutation({
    query: (user) => ({
      url: "/auth/login",
      method: "POST",
      body: user,
    }),
    onQueryStarted: async ({ dispatch, queryFulfilled }) => {
      try {
        const { data } = await queryFulfilled;
        dispatch(setToken(data.token));
        dispatch(setRefreshToken(data.refreshToken));
      } catch (err) {
        // Handle error
      }
    },
  }),
});
