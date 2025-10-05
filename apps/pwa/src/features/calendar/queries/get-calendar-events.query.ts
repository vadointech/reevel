import { QueryBuilderQuery } from "@/lib/react-query";
import { getUserCalendarEvents } from "@/api/calendar/server";
import { MapProviderGL } from "@/components/shared/map/types";
import { EventEntity, EventParticipationType } from "@/entities/event";

export namespace GetCalendarEventsQuery {
    export type TInput = {
        center: MapProviderGL.LngLat,
        radius: number,
        regionId?: string,
        filter?: string,
    };
    export type TOutput = EventEntity[];
}

export const GetCalendarEventsQuery: QueryBuilderQuery<GetCalendarEventsQuery.TInput, GetCalendarEventsQuery.TOutput> = (input) => {
    return {
        queryKey: GetCalendarEventsQuery.queryKey([input.regionId]),
        queryFn: () => GetCalendarEventsQuery.queryFunc(input),
    };
};

GetCalendarEventsQuery.queryKey = (params = []) => {
    return ["calendar/events/", ...params];
};

GetCalendarEventsQuery.queryFunc = (input) => {
    return getUserCalendarEvents({
        limit: input.filter ? 20 : 10,
        participationType: input.filter as EventParticipationType,
    }).then(response => response.events);
};