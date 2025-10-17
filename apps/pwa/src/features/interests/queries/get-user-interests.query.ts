import { QueryBuilderQuery } from "@/lib/react-query";
import { InterestEntity } from "@/entities/interests";
import { getCurrentUserInterests } from "@/api/user";
import { profileInterestsToInterestsEntity } from "@/features/interests/mappers";

export namespace GetUserInterestsQuery {
    export type TInput = null;
    export type TOutput = InterestEntity[];
}

export const GetUserInterestsQuery: QueryBuilderQuery<GetUserInterestsQuery.TInput, GetUserInterestsQuery.TOutput> = () => {
    return {
        queryKey: GetUserInterestsQuery.queryKey(),
        queryFn: () => GetUserInterestsQuery.queryFunc(),
    };
};

GetUserInterestsQuery.queryKey = (params = []) => {
    return ["user/interests/", ...params.filter(Boolean)];
};

GetUserInterestsQuery.queryFunc = () => {
    return getCurrentUserInterests({
        fallback: [],
    }).then(response => response.data)
        .then(response => response.map(profileInterestsToInterestsEntity));
};