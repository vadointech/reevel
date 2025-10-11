import { fetcherClient } from "@/api/client";
import { EventEntity } from "@/entities/event";
import { RequestWithPagination } from "@/types/dtos";

export namespace GetRandomizedEvents {
    export type TInput = null;
    export type TParams = Partial<RequestWithPagination & {
        cityId: string;
        interestId: string;
    }>;
    export type TOutput = EventEntity[];
}

export const getRandomizedEvents = fetcherClient.fetch<GetRandomizedEvents.TInput, GetRandomizedEvents.TOutput, GetRandomizedEvents.TParams>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/discover/events/randomized", input);
    },
});