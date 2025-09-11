import { fetcherClient } from "@/api/fetcher-client";
import { SupportedFileCollections, SupportedFileTypes, UserUploadsEntity } from "@/entities/uploads";

export namespace GetUserUploads {
    export type TInput = null;

    export type TParams = Partial<{
        collection: SupportedFileCollections;
        fileType: SupportedFileTypes;
        tags: string;
    }>;

    export type TOutput = UserUploadsEntity[];

    export const queryKey = ["user/uploads"];
}

export const getCurrentUserUploads = fetcherClient.fetch<GetUserUploads.TInput, GetUserUploads.TOutput, GetUserUploads.TParams>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/users/me/uploads", input);
    },
});