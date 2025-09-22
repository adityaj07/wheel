import {LIMIT_DEFAULT, PAGE_DEFAULT} from "@/constants/pagination";

type QueryType = {
  page?: string;
  limit?: string;
};

type PaginationMetaInput = {
  totalCount: number;
  page: number;
  limit: number;
};

type PaginationMetaType = {
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
};

export function getPaginationParams(query: QueryType) {
  const page = Math.max(
    parseInt(query.page || "") || PAGE_DEFAULT,
    PAGE_DEFAULT,
  );
  const limit = Math.max(
    parseInt(query.limit || "") || LIMIT_DEFAULT,
    LIMIT_DEFAULT,
  );
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
