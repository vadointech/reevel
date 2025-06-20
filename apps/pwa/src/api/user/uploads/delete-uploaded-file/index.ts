import { fetcherClient } from "@/api/fetcher-client";

export namespace DeleteUploadedFile {
    export type TInput = {
        fileId: string;
    };
    export type TOutput = boolean | null;
}

export const deleteUploadedFile = fetcherClient.fetch<DeleteUploadedFile.TInput, DeleteUploadedFile.TOutput>({
    fetcherFunc: (fetcher, { body, ...config }) => {
        return fetcher.delete(`/users/me/uploads/${body?.fileId}`, config);
    },
});