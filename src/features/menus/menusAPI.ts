// features/menus/menusAPI.ts
import rootApi from "../../services/root.API";

interface MenuItem {
  id: string;
  position: string;
  title: string;
}

interface SubmenuItem {
  id: string;
  title: string;
  url: string;
  menuID: string;
}

export const menusAPI = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getMenus: builder.query<MenuItem[], void>({
      query: () => ({
        url: "/wordpress/menu/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
    getSubmenusById: builder.query<SubmenuItem[], string>({
      query: (id) => ({
        url: `/wordpress/submenu/?menuID=${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
  }),
});

export const { useGetMenusQuery, useGetSubmenusByIdQuery } = menusAPI;