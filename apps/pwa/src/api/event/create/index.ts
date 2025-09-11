import { fetcherClient } from "@/api/fetcher-client";
import { EventEntity, EventVisibility } from "@/entities/event";

export namespace CreateEvent {
    export type TInput = {
        title: string;
        description: string;
        poster: string;
        posterFieldId: string;
        primaryColor?: string;
        locationPoint: number[];
        locationTitle: string;
        ticketsAvailable?: string;
        ticketPrice?: string;
        visibility?: EventVisibility;
        startDate: Date;
        endDate?: Date;
        interests?: string[];
    };
    export type TOutput = EventEntity | null;

    export const queryKey = ["event/create"];
}

export const createEvent = fetcherClient.fetch<CreateEvent.TInput, CreateEvent.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.post("/events", input);
    },
});