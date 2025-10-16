import rootApi from "../../services/root.API";

export const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: "/login/",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
