// services/root.API.ts
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://102.216.253.12:5000/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuthHandling: BaseQueryFn<
  Parameters<typeof baseQuery>[0],
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // Handle unauthorized access, e.g., dispatch a logout action or redirect to login
    console.warn("Unauthorized! Redirecting to login...");
    // Example: api.dispatch(logout());
    localStorage.removeItem("access_token");
    window.location.href = "/login"; // Redirect to login page
  }
  return result;
};

const rootApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuthHandling,
  tagTypes: ["Menus", "Submenus", "PageContent"],
  endpoints: () => ({}),
});

// Inject all API endpoints
export const enhancedApi = rootApi.enhanceEndpoints({
  addTagTypes: ["Menus", "Submenus", "PageContent"],
});

export default rootApi;
