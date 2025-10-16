import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rootApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://102.216.253.12:5000/",
    prepareHeaders: (headers) => headers,
  }),
  endpoints: () => ({}),
});

export default rootApi;
