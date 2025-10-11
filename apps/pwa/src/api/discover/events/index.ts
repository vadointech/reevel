import { RequestWithPagination, ResponseWithPagination } from "@/types/dtos";
import { EventEntity } from "@/entities/event";
import { fetcherClient } from "@/api/client";

export namespace GetEvents {
    export type TInput = null;
    export type TParams = Partial<RequestWithPagination & {
        cityId: string;
        interestId: string;
    }>;
    export type TOutput = ResponseWithPagination<EventEntity[]>;
}

export const getEvents = fetcherClient.fetch<GetEvents.TInput, GetEvents.TOutput, GetEvents.TParams>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/discover/events", input);
    },
});