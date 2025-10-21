// features/pages/pageContent.API.ts
import rootApi from "../../services/root.API";
import { PageContent } from "../../interface";

export const pageContentAPI = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getPageContentBySlug: builder.query<PageContent, string>({
      query: (pageName) => ({
        url: `/wordpress/page/?title=${encodeURIComponent(pageName)}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
  }),
});

export const { useGetPageContentBySlugQuery } = pageContentAPI;