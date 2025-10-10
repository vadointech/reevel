import { EventEntity } from "@/entities/event";
import { QueryBuilderQuery } from "@/lib/react-query";
import { getEventCityHighlightsCollection } from "@/api/event/server";

export namespace GetCityHighlightsQuery {
    export type TInput = null;
    export type TOutput = EventEntity[];
}

export const GetCityHighlightsQuery: QueryBuilderQuery<GetCityHighlightsQuery.TInput, GetCityHighlightsQuery.TOutput> = () => {
    return {
        queryKey: GetCityHighlightsQuery.queryKey(),
        queryFn: () => GetCityHighlightsQuery.queryFunc(),
    };
};

GetCityHighlightsQuery.queryFunc = () => {
    return getEventCityHighlightsCollection();
};

GetCityHighlightsQuery.queryKey = (params = []) => {
    return ["events/collections/highlights/", ...params];
};