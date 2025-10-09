import { fetcherClient } from "@/api/client";
import { EventEntity } from "@/entities/event";

export namespace GetCurrentUserEvents {
    export type TInput = null;
    export type TOutput = EventEntity[];

    export const queryKey = ["user/interests"];
}

export const getCurrentUserEvents = fetcherClient.fetch<GetCurrentUserEvents.TInput, GetCurrentUserEvents.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/users/me/events", input);
    },
});