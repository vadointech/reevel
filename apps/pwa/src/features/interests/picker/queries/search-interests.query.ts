import { getInterestsByTitle, GetInterestsByTitle } from "@/api/interests";
import { FetchQueryOptions } from "@tanstack/react-query";
import { QueryBuilderQuery } from "@/lib/react-query";

export namespace SearchInterestsQueryBuilder {
    export type TInput = {
        query: string;
    };
}

export const SearchInterestsQueryBuilder: QueryBuilderQuery<SearchInterestsQueryBuilder.TInput, GetInterestsByTitle.TOutput> = (
    input: SearchInterestsQueryBuilder.TInput,
): FetchQueryOptions<GetInterestsByTitle.TOutput> => {
    return {
        queryKey: SearchInterestsQueryBuilder.queryKey([input.query]),
        queryFn: () => SearchInterestsQueryBuilder.queryFunc(input),
    };
};

SearchInterestsQueryBuilder.queryFunc = (input) => {
    return getInterestsByTitle({
        params: {
            title_en: input.query,
        },
    }).then(response => response.data || []);
};

SearchInterestsQueryBuilder.queryKey = (params = []) => {
    return [...GetInterestsByTitle.queryKey, ...params];
};