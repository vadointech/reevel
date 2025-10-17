import { QueryBuilderQuery, QueryKey } from "@/lib/react-query";
import { getUserCalendarEvents, GetUserCalendarEvents } from "@/api/calendar";
import { paginationPlaceholder } from "@/entities/placeholders";

export const GetUserCalendarEventsQuery: QueryBuilderQuery<GetUserCalendarEvents.TParams, GetUserCalendarEvents.TOutput> = (input) => {
    return {
        queryKey: GetUserCalendarEventsQuery.queryKey(QueryKey.fromObject(input)),
        queryFn: () => GetUserCalendarEventsQuery.queryFunc(input),
    };
};

GetUserCalendarEventsQuery.queryKey = (params = []) => {
    return ["calendar/events", ...params];
};

GetUserCalendarEventsQuery.queryFunc = (input) => {
    return getUserCalendarEvents({
        params: input,
        fallback: {
            data: [],
            pagination: paginationPlaceholder,
        },
    }).then(response => response.data);
};