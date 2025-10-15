import { QueryBuilderQuery } from "@/lib/react-query";
import { getSession } from "@/api/user";
import { UserEntity } from "@/entities/user";

export namespace GetSessionQuery {
    export type TInput = null;
    export type TOutput = UserEntity | null;
}

export const GetSessionQuery: QueryBuilderQuery<GetSessionQuery.TInput, GetSessionQuery.TOutput> = () => {
    return {
        queryKey: GetSessionQuery.queryKey(),
        queryFn: () => GetSessionQuery.queryFunc(),
    };
};

GetSessionQuery.queryKey = (params = []) => {
    return ["/user/me/", ...params.filter(Boolean)];
};

GetSessionQuery.queryFunc = () => {
    return getSession({}).then(response => response.data);
};