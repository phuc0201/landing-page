export interface QueryPagination {
  current: number;
  pageSize: number;
}

export interface QueryParameter<
  TFilters extends Record<string, unknown> = Record<string, unknown>,
> {
  keyword?: string;
  search?: string;
  order?: string;
  filters?: Partial<TFilters>;
  pagination?: QueryPagination;
}
