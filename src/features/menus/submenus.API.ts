// features/menus/submenus.API.ts
import rootApi from "../../services/root.API";
import { SubmenuResponse } from "../../interface";

export const submenuAPI = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubmenusById: builder.query<SubmenuResponse[], string>({
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

export const { useGetSubmenusByIdQuery } = submenuAPI;