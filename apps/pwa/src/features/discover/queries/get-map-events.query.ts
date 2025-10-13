import { EventEntity, EventPointEntity } from "@/entities/event";
import { QueryBuilderQuery } from "@/lib/react-query";
import { GetNearbyEventsQuery } from "@/features/discover/queries/get-nearby-events.query";
import { eventEntityToEventPointEntity } from "@/features/event/mappers";

export function getMapEventsQueryBuilder(injected: EventEntity[] = [], queryKey: unknown[] = []) {
    const query: QueryBuilderQuery<GetNearbyEventsQuery.TInput, EventPointEntity[]> = (input) => {
        return {
            queryKey: query.queryKey([input.filter]),
            queryFn: () => query.queryFunc(input),
        };
    };

    query.queryKey = (params = []) => {
        return [...queryKey, params.filter(Boolean)];
    };

    query.queryFunc = async(input) => {
        if(input.filter) {
            return injected.filter(event =>
                event.interests.some(item => item.interestId === input.filter),
            ).map(eventEntityToEventPointEntity);
        } else {
            return Promise.resolve([]);
        }
    };

    return query;
}