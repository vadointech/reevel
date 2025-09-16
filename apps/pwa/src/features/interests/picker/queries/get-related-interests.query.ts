import { FetchQueryOptions } from "@tanstack/react-query";
import { GetRelatedInterests } from "@/api/interests";
import { getRelatedInterests } from "@/api/interests/server";
import { QueryBuilderQuery } from "@/lib/react-query";

export namespace GetRelatedInterestsQueryBuilder {
    export type TInput = {
        slug: string;
    };
    export type TOutput = GetRelatedInterests.TOutput;
}

export const GetRelatedInterestsQueryBuilder: QueryBuilderQuery<GetRelatedInterestsQueryBuilder.TInput, GetRelatedInterestsQueryBuilder.TOutput> = (
    input: GetRelatedInterestsQueryBuilder.TInput,
): FetchQueryOptions<GetRelatedInterestsQueryBuilder.TOutput> => {
    return {
        queryKey: GetRelatedInterestsQueryBuilder.queryKey([input.slug]),
        queryFn: () => GetRelatedInterestsQueryBuilder.queryFunc(input),
    };
};

GetRelatedInterestsQueryBuilder.queryFunc = (input) => {
    return getRelatedInterests(input);
};

GetRelatedInterestsQueryBuilder.queryKey = (params = []) => {
    return [...GetRelatedInterests.queryKey, ...params];
};