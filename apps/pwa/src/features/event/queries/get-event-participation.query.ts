import { QueryBuilderQuery } from "@/lib/react-query";
import { getEventParticipationStatus, GetEventParticipationStatus } from "@/api/event";

export const GetEventParticipationStatusQuery: QueryBuilderQuery<GetEventParticipationStatus.TInput, GetEventParticipationStatus.TOutput> = (input) => {
    return {
        queryKey: GetEventParticipationStatusQuery.queryKey([input]),
        queryFn: () => GetEventParticipationStatusQuery.queryFunc(input),
    };
};

GetEventParticipationStatusQuery.queryKey = (params = []) => {
    return ["events/participation/", ...params];
};

GetEventParticipationStatusQuery.queryFunc = async(input) => {
    return getEventParticipationStatus({
        body: input,
        fallback: {
            eventId: input,
            participationStatus: null,
        },
    }).then(response => response.data);
};