import { UserProfileEntity } from "@/entities/profile";
import { QueryBuilderQuery } from "@/lib/react-query";
import { getCurrentUserProfile } from "@/api/user";

export namespace GetCurrentUserProfileQuery {
    export type TInput = null;
    export type TOutput = UserProfileEntity | null;
}

export const GetCurrentUserProfileQuery: QueryBuilderQuery<GetCurrentUserProfileQuery.TInput, GetCurrentUserProfileQuery.TOutput> = () => {
    return {
        queryKey: GetCurrentUserProfileQuery.queryKey(),
        queryFn: () => GetCurrentUserProfileQuery.queryFunc(),
    };
};

GetCurrentUserProfileQuery.queryKey = (params = []) => {
    return ["me/profile/", ...params.filter(Boolean)];
};

GetCurrentUserProfileQuery.queryFunc = () => {
    return getCurrentUserProfile({}).then(response => response.data);
};