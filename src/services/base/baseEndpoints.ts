import type { ApiResponse } from "../../types/apiResponse";
import type { QueryParameter } from "../../types/queryParameter";
import { buildParams } from "../../utils/queryHelpers";
import type { TaggedBuilder } from "./baseFactory";

export function buildBaseEndpoints<TEntity extends Record<string, unknown>, TTag extends string>(
  builder: TaggedBuilder<TTag>,
  resource: string,
  tag: TTag,
) {
  return {
    getList: builder.query<ApiResponse<TEntity[]>, QueryParameter<TEntity>>({
      query: (args) => ({
        url: resource,
        method: "GET",
        params: buildParams(args),
      }),
      providesTags: [tag],
    }),

    getById: builder.query<ApiResponse<TEntity>, string | number>({
      query: (id) => ({
        url: `${resource}/${id}`,
        method: "GET",
      }),
      providesTags: [tag],
    }),
  };
}
