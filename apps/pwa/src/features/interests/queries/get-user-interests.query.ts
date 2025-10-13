import { QueryBuilderQuery } from "@/lib/react-query";
import { getCurrentUserInterests } from "@/api/user/server";
import { InterestEntity } from "@/entities/interests";

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
    return getCurrentUserInterests();
};