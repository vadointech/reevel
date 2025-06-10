import { MobxStore } from "@/types/common";
import { UploadApiErrorResponse, UploadApiResponse } from "@/api/upload/types";

export interface IFileUploaderStore extends MobxStore {
    loading: boolean;
    uploadResponse: UploadApiResponse | undefined;
    uploadErrorResponse: UploadApiErrorResponse | undefined;

    setLoading(loading: boolean): void;
    setUploadResponse(uploadResponse: UploadApiResponse | undefined): void;
    setUploadErrorResponse(uploadErrorResponse: UploadApiErrorResponse | undefined): void;
}