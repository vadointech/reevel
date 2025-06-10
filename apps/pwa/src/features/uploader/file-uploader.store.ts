import { IFileUploaderStore } from "./types";
import { action, IReactionDisposer, makeObservable, observable, reaction } from "mobx";
import { UploadApiErrorResponse, UploadApiResponse } from "@/api/upload/types";

export class FileUploaderStore implements IFileUploaderStore {
    loading: boolean = false;
    uploadResponse: UploadApiResponse | undefined = undefined;
    uploadErrorResponse: UploadApiErrorResponse | undefined = undefined;

    private readonly disposer?: IReactionDisposer;

    constructor(
        syncUploadResponse?: (uploadResponse: UploadApiResponse | undefined) => void,
    ) {
        makeObservable(this, {
            loading: observable,
            uploadResponse: observable,

            setLoading: action,
            setUploadResponse: action,
        });

        if(syncUploadResponse) {
            this.disposer = reaction(
                () => this.uploadResponse,
                syncUploadResponse,
            );
        }
    }

    dispose() {
        this.disposer?.();
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setUploadResponse(uploadResponse: UploadApiResponse | undefined) {
        this.uploadResponse = uploadResponse;
    }

    setUploadErrorResponse(uploadErrorResponse: UploadApiErrorResponse | undefined) {
        this.uploadErrorResponse = uploadErrorResponse;
    }
}