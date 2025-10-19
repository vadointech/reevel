import { EventParticipationType } from "@/entities/event";
import { fetcherClient } from "@/api/client";

export namespace GetEventParticipationStatus {
    export type TInput = string;
    export type TOutput = {
        eventId: string;
        participationStatus: EventParticipationType | null;
    };
}

export const getEventParticipationStatus = fetcherClient.fetch<GetEventParticipationStatus.TInput, GetEventParticipationStatus.TOutput>({
    fetcherFunc: (fetcher, { body, ...input }) => {
        return fetcher.get(`/events/${body}/participation`, input);
    },
});