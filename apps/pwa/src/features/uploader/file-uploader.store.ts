import { IFileUploaderStore } from "./types";
import { action, makeObservable, observable } from "mobx";

export class FileUploaderStore implements IFileUploaderStore {
    loading: boolean = false;
    fileUrl?: string;

    constructor() {
        makeObservable(this, {
            loading: observable,

            setLoading: action,
        });
    }

    dispose() {}

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setFileUrl(url?: string) {
        this.fileUrl = url;
    }
}