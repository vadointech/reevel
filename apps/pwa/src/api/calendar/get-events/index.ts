import { fetcherClient } from "@/api/client";
import { EventEntity, EventParticipationType } from "@/entities/event";
import { ResponseWithPagination } from "@/types/dtos";

export namespace GetUserCalendarEvents {
    export type TInput = null;
    export type TParams = Partial<{
        startDate: string;
        endDate: string;
        participationType: EventParticipationType;
        search: string;
        page: number;
        limit: number;
    }>;
    export type TOutput = ResponseWithPagination<EventEntity[]>;
}

export const getUserCalendarEvents = fetcherClient.fetch<GetUserCalendarEvents.TInput, GetUserCalendarEvents.TOutput, GetUserCalendarEvents.TParams>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/calendar/me", input);
    },
});