import { getInterestsFeed, GetInterestsFeed } from "@/api/discover";
import { QueryBuilderQuery } from "@/lib/react-query";

export namespace GetInterestsFeedQuery {
    export type TInput = GetInterestsFeed.TInput;
    export type TOutput = GetInterestsFeed.TOutput;
}

export const GetInterestsFeedQuery: QueryBuilderQuery<GetInterestsFeedQuery.TInput, GetInterestsFeedQuery.TOutput> = () => {
    return {
        queryKey: GetInterestsFeedQuery.queryKey(),
        queryFn: () => GetInterestsFeedQuery.queryFunc(),
    };
};

GetInterestsFeedQuery.queryKey = (params = []) => {
    return ["interests/feed/", ...params.filter(Boolean)];
};

GetInterestsFeedQuery.queryFunc = () => {
    return getInterestsFeed({
        fallback: [],
    }).then(response => response.data);
};