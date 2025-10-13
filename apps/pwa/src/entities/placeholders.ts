import { ResponseWithPagination } from "@/types/dtos";

export const paginationPlaceholder: ResponseWithPagination<unknown>["pagination"] = {
    page: 1,
    limit: 1,
    totalPages: 1,
    totalItems: 1,
};