import { QueryBuilderQuery } from "@/lib/react-query";
import { GetUserCalendarEvents } from "@/api/calendar";
import { getUserCalendarEvents } from "@/api/calendar/server";

export namespace SearchCalendarEventsQuery {
    export type TInput = string;
    export type TOutput = GetUserCalendarEvents.TOutput;
}

export const SearchCalendarEventsQuery: QueryBuilderQuery<SearchCalendarEventsQuery.TInput, SearchCalendarEventsQuery.TOutput> = (input) => {
    return {
        queryKey: SearchCalendarEventsQuery.queryKey([input]),
        queryFn: () => SearchCalendarEventsQuery.queryFunc(input),
    };
};

SearchCalendarEventsQuery.queryKey = (params = []) => {
    return ["calendar/events/search/", ...params];
};

SearchCalendarEventsQuery.queryFunc = (input) => {
    return getUserCalendarEvents({
        search: input,
    });
};