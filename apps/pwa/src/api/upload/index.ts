import { fetcherClient } from "@/api/fetcher-client";

export interface UploadApiResponse {
    public_id: string;
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: "image" | "video" | "raw" | "auto";
    created_at: string;
    tags: Array<string>;
    pages: number;
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    access_mode: string;
    original_filename: string;
    moderation: Array<string>;
    access_control: Array<string>;
    context: object; //won't change since it's response, we need to discuss documentation team about it before implementing.
    metadata: object; //won't change since it's response, we need to discuss documentation team about it before implementing.
    colors?: [string, number][];

    [futureKey: string]: any;
}

export interface UploadApiErrorResponse {
    message: string;
    name: string;
    http_code: number;

    [futureKey: string]: any;
}


export namespace UploadFile {
    export type TInput = {
        file: Blob;
    };

    export type TOutput = UploadApiResponse | UploadApiErrorResponse;
}

export const uploadFile = fetcherClient<UploadFile.TInput, UploadFile.TOutput>({
    fetcherFunc: (fetcher, input) => {
        const formData = new FormData();

        if(input?.body) {
            const croppedFile = new File([input.body.file], "test.png", { type: "image/png" });
            formData.append("files", croppedFile);
        }

        return fetcher.post("/upload/images", {
            body: formData,
        });
    },
});