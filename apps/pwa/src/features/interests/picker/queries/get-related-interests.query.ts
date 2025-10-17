import { GetRelatedInterests } from "@/api/interests";
import { getRelatedInterests } from "@/api/interests";
import { QueryBuilderQuery } from "@/lib/react-query";

export const GetRelatedInterestsQueryBuilder: QueryBuilderQuery<GetRelatedInterests.TInput, GetRelatedInterests.TOutput> = (input) => {
    return {
        queryKey: GetRelatedInterestsQueryBuilder.queryKey([input.slug]),
        queryFn: () => GetRelatedInterestsQueryBuilder.queryFunc(input),
    };
};

GetRelatedInterestsQueryBuilder.queryKey = (params = []) => {
    return ["/interests/related/", ...params];
};

GetRelatedInterestsQueryBuilder.queryFunc = (input) => {
    return getRelatedInterests({
        body: input,
        fallback: [],
    }).then(response => response.data);
};