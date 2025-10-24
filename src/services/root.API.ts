// services/root.API.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rootApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Menus', 'Submenus', 'PageContent'],
  endpoints: () => ({}),
});

// Inject all API endpoints
export const enhancedApi = rootApi.enhanceEndpoints({
  addTagTypes: ['Menus', 'Submenus', 'PageContent']
});



export default rootApi;