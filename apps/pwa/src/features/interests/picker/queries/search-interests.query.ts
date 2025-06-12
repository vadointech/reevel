import { QueryBuilder } from "@/types/common";
import { getInterestsByTitle, GetInterestsByTitle } from "@/api/interests";
import { FetchQueryOptions } from "@tanstack/react-query";

export namespace SearchInterestsQueryBuilder {
    export type TInput = {
        query: string;
    };
}

export const SearchInterestsQueryBuilder: QueryBuilder<SearchInterestsQueryBuilder.TInput, GetInterestsByTitle.TOutput> = ({
    query,
}: SearchInterestsQueryBuilder.TInput): FetchQueryOptions<GetInterestsByTitle.TOutput> => {
    return {
        queryKey: SearchInterestsQueryBuilder.queryKey([query]),
        queryFn: () => getInterestsByTitle({
            params: {
                title_en: query,
            },
        }).then(response => response.data || []),
    };
};

SearchInterestsQueryBuilder.queryKey = (params = []) => {
    return [...GetInterestsByTitle.queryKey, ...params];
};