import { searchCity, SearchCity } from "@/api/cities";
import { QueryBuilderQuery } from "@/lib/react-query";

export namespace SearchCityQuery {
    export type TInput = SearchCity.TParams;
    export type TOutput = SearchCity.TOutput;
}

export const SearchCityQuery: QueryBuilderQuery<SearchCityQuery.TInput, SearchCityQuery.TOutput> = (input) => {
    return {
        queryKey: SearchCityQuery.queryKey([input.q]),
        queryFn: () => SearchCityQuery.queryFunc(input),
    };
};

SearchCityQuery.queryKey = (params = []) => {
    return ["cities/search/", ...params];
};

SearchCityQuery.queryFunc = (input) => {
    return searchCity({
        params: input,
        fallback: [],
    }).then(response => response.data);
};