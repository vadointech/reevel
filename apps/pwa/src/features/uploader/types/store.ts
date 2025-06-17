import { UploadApiErrorResponse, UploadApiResponse } from "@/api/upload/types";
import { IMobxStore } from "@/lib/mobx";

export interface IFileUploaderStore extends IMobxStore {
    loading: boolean;
    uploadResponse: UploadApiResponse | undefined;
    uploadErrorResponse: UploadApiErrorResponse | undefined;

    setLoading(loading: boolean): void;
    setUploadResponse(uploadResponse: UploadApiResponse | undefined): void;
    setUploadErrorResponse(uploadErrorResponse: UploadApiErrorResponse | undefined): void;
}