import { fetcherClient } from "@/api/fetcher-client";
import { UploadApiErrorResponse, UploadApiResponse } from "./types";

export namespace UploadFile {
    export type TInput = {
        file: Blob;
    };

    export type TOutput = Array<UploadApiResponse | UploadApiErrorResponse> | null;

    export const queryKey = ["uploads/file"];
}

export const uploadFile = fetcherClient<UploadFile.TInput, UploadFile.TOutput>({
    fetcherFunc: (fetcher, input) => {
        const formData = new FormData();

        if(input?.body) {
            const croppedFile = new File([input.body.file], "test.png", { type: "image/png" });
            formData.append("files", croppedFile);
        }

        return fetcher.post("/uploads/images", {
            body: formData,
        });
    },
});