import { QueryBuilder } from "@/types/common";
import { FetchQueryOptions } from "@tanstack/react-query";
import { getRelatedInterests, GetRelatedInterests } from "@/api/interests";

export namespace GetRelatedInterestsQueryBuilder {
    export type TInput = {
        slug: string;
    };
    export type TOutput = GetRelatedInterests.TOutput;
}

export const GetRelatedInterestsQueryBuilder: QueryBuilder<GetRelatedInterestsQueryBuilder.TInput, GetRelatedInterestsQueryBuilder.TOutput> = (
    input: GetRelatedInterestsQueryBuilder.TInput,
): FetchQueryOptions<GetRelatedInterestsQueryBuilder.TOutput> => {
    return {
        queryKey: GetRelatedInterestsQueryBuilder.queryKey([input.slug]),
        queryFn: () => getRelatedInterests({ body: input })
            .then(response => response.data || []),
    };
};

GetRelatedInterestsQueryBuilder.queryKey = (params = []) => {
    return [...GetRelatedInterests.queryKey, ...params];
};