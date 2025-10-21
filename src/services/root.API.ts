// services/root.API.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { menusAPI } from '../features/menus/menusAPI';
// import { submenuAPI } from '../features/menus/submenus.API';
// import { pageContentAPI } from '../features/pageContent';

const rootApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://102.216.253.12:5000/",
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

// Combine all APIs
// export const combinedAPI: typeof enhancedApi = enhancedApi.injectEndpoints({
//   endpoints: (builder) => ({
//     ...menusAPI.endpoints,
//     ...submenuAPI.endpoints,
//     ...pageContentAPI.endpoints,
//   }),
// });

export default rootApi;