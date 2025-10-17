import { ResponseWithPagination } from "@/types/dtos";

export const paginationPlaceholder: ResponseWithPagination<unknown>["pagination"] = {
    page: 1,
    limit: 1,
    totalPages: 0,
    totalItems: 0,
};