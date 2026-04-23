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

    // create: builder.mutation<ApiResponse<TEntity>, TCreateDto>({
    //   query: (body) => ({
    //     url: resource,
    //     method: "POST",
    //     data: body,
    //   }),
    //   invalidatesTags: [tag],
    // }),

    // update: builder.mutation<ApiResponse<TEntity>, { id: string | number; body: TUpdateDto }>({
    //   query: ({ id, body }) => ({
    //     url: `${resource}/${id}`,
    //     method: "PATCH",
    //     data: body,
    //   }),
    //   invalidatesTags: [tag],
    // }),

    // remove: builder.mutation<ApiResponse<void>, string | number>({
    //   query: (id) => ({
    //     url: `${resource}/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tag],
    // }),
  };
}
