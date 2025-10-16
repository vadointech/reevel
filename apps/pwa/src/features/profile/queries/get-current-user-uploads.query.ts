import { QueryBuilderQuery } from "@/lib/react-query";
import { getUserUploads, GetUserUploads } from "@/api/user";

export const GetCurrentUserUploadsQuery: QueryBuilderQuery<GetUserUploads.TParams, GetUserUploads.TOutput> = (input) => {
    return {
        queryKey: GetCurrentUserUploadsQuery.queryKey([input.collection, input.tags, input.fileType]),
        queryFn: () => GetCurrentUserUploadsQuery.queryFunc(input),
    };
};

GetCurrentUserUploadsQuery.queryKey = (params = []) => {
    return ["me/uploads/", ...params.filter(Boolean)];
};

GetCurrentUserUploadsQuery.queryFunc = (input) => {
    return getUserUploads({
        params: input,
        fallback: [],
    }).then(response => response.data);
};