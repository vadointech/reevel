import { QueryBuilderQuery } from "@/lib/react-query";
import { getCurrentUserInterests, GetCurrentUserInterests } from "@/api/user";
import { InterestEntity } from "@/entities/interests";
import { profileInterestsToInterestsEntity } from "@/features/interests/mappers";


export const GetCurrentUserInterestsQuery: QueryBuilderQuery<GetCurrentUserInterests.TInput, InterestEntity[]> = () => {
    return {
        queryKey: GetCurrentUserInterestsQuery.queryKey(),
        queryFn: () => GetCurrentUserInterestsQuery.queryFunc(),
    };
};

GetCurrentUserInterestsQuery.queryKey = (params = []) => {
    return ["me/interests/", ...params.filter(Boolean)];
};

GetCurrentUserInterestsQuery.queryFunc = () => {
    return getCurrentUserInterests({
        fallback: [],
    }).then(response => response.data)
        .then(response => response.map(profileInterestsToInterestsEntity));
};