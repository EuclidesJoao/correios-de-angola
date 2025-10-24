// features/menus/menusAPI.ts
import rootApi from "../../services/root.API";
import { ApiMenuItem } from "../../interface";

export const menusAPI = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getMenus: builder.query<ApiMenuItem[], void>({
      query: () => ({
        url: "/wordpress/menu/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
  }),
});

export const { useGetMenusQuery } = menusAPI;