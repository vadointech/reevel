"use server";

import { getAccessToken } from "@/api/server";

import * as GetCurrentUserUploads from "./get-uploads";
import * as DeleteUploadedFile from "./delete-uploaded-file";

export async function getCurrentUserUploads(params: GetCurrentUserUploads.GetUserUploads.TParams) {
    const accessToken = await getAccessToken();

    const response = await GetCurrentUserUploads.getCurrentUserUploads({
        params,
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
        fallback: [],
    });

    return response.data;
}

export async function deleteUploadedFile(input: DeleteUploadedFile.DeleteUploadedFile.TInput) {
    const accessToken = await getAccessToken();

    const response = await DeleteUploadedFile.deleteUploadedFile({
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
        body: input,
    });

    return response.data;
}