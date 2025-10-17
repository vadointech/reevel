import { QueryBuilderQuery } from "@/lib/react-query";
import { getCurrentUserEvents, GetCurrentUserEvents } from "@/api/user";

export const GetCurrentUserEventsQuery: QueryBuilderQuery<GetCurrentUserEvents.TInput, GetCurrentUserEvents.TOutput> = () => {
    return {
        queryKey: GetCurrentUserEventsQuery.queryKey(),
        queryFn: () => GetCurrentUserEventsQuery.queryFunc(),
    };
};

GetCurrentUserEventsQuery.queryKey = (params = []) => {
    return ["me/events/", ...params.filter(Boolean)];
};

GetCurrentUserEventsQuery.queryFunc = () => {
    return getCurrentUserEvents({
        fallback: [],
    }).then(response => response.data);
};