import { MobxStore } from "@/types/common";

export interface IFileUploaderStore extends MobxStore {
    loading: boolean;
    fileUrl?: string;

    setLoading(loading: boolean): void;
    setFileUrl(url?: string): void;
}