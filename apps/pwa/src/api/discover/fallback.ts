import { ResponseWithPagination } from "@/types/dtos";
import { EventEntity } from "@/entities/event";

export const eventsWithPaginationFallback: ResponseWithPagination<EventEntity[]> = {
    data: [],
    pagination: {
        page: 1,
        limit: 10,
        totalPages: 1,
        totalItems: 10,
    },
};