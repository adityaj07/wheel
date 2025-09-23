import {LIMIT_DEFAULT, PAGE_DEFAULT} from "@/constants/pagination";

export type QueryType = {
  page?: number; // we already parse thru zod and convert to number from string, hence number here
  limit?: number;
};

export type PaginationMetaInput = {
  totalCount: number;
  page: number;
  limit: number;
};

export type PaginationMetaType = {
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
};

export function getPaginationParams(query: QueryType) {
  const page = Math.max(query.page || PAGE_DEFAULT, PAGE_DEFAULT);
  const limit = Math.max(query.limit || LIMIT_DEFAULT, LIMIT_DEFAULT);
  const skip = (page - 1) * limit;

  return {page, limit, skip};
}

export function getPaginationMeta({
  totalCount,
  page,
  limit,
}: PaginationMetaInput): PaginationMetaType {
  return {
    page,
    limit,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
  };
}
