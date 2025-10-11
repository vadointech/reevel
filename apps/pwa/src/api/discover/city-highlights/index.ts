import { fetcherClient } from "@/api/client";
import { RequestWithPagination, ResponseWithPagination } from "@/types/dtos";
import { EventEntity } from "@/entities/event";

export namespace GetCityHighlights {
    export type TInput = null;
    export type TParams = Partial<RequestWithPagination & {
        cityId: string;
    }>;
    export type TOutput = ResponseWithPagination<EventEntity[]>;
}

export const getCityHighlights = fetcherClient.fetch<GetCityHighlights.TInput, GetCityHighlights.TOutput, GetCityHighlights.TParams>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/discover/highlights", input);
    },
});