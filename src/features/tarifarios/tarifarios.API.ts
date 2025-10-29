import rootApi from "../../services/root.API";

export const tarifariosApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getTarifarios: builder.query<any, void>({
      query: () => "/CA/tarifario/",
    }),
    getProdutoByTarifario: builder.query({
      query: (tarifario) => `/CA/produto/tarifario/?tarifario=${tarifario}`,
    }),

    getRegiao: builder.query({
      query: () => "/CA/regiao/",
    }),
    getTarifarioDetails: builder.query({
      query: (peso) => `/CA/tarifa/escalao/?peso=${peso}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTarifariosQuery,
  useGetProdutoByTarifarioQuery,
  useGetRegiaoQuery,
  useGetTarifarioDetailsQuery,
} = tarifariosApi;
