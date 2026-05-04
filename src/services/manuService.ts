import type { ApiResponse } from "../types/apiResponse";
import type { ManufacturingProcess } from "../types/manu.type";
import { createBaseApiFactory } from "./base/baseFactory";

export const manuService = createBaseApiFactory<ManufacturingProcess, "manu">({
  resource: "manu",
  tag: "manu",
});

const manuExtraApi = manuService.injectEndpoints({
  endpoints: (builder) => ({
    getManufacturingProcess: builder.query<ManufacturingProcess, void>({
      query: () => ({
        url: "site-configs/manu",
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<ManufacturingProcess>) => {
        return response.data as ManufacturingProcess;
      },
    }),
  }),
});

export const { useGetManufacturingProcessQuery } = manuExtraApi;
