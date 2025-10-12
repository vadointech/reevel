import { fetcherClient } from "@/api/client";
import { RequestWithPagination, ResponseWithPagination } from "@/types/dtos";
import { EventEntity } from "@/entities/event";

export namespace GetHighlights {
    export type TInput = null;
    export type TParams = Partial<RequestWithPagination & {
        cityId: string;
    }>;
    export type TOutput = ResponseWithPagination<EventEntity[]>;
}

export const getHighlights = fetcherClient.fetch<GetHighlights.TInput, GetHighlights.TOutput, GetHighlights.TParams>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/discover/highlights", input);
    },
});