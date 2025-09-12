import { IMobxStore } from "@/lib/mobx";

export interface IDiscoverStore extends IMobxStore {
    collectionToPreview: string;
    pointToPreview: string | null;
    interestFilter: string | null;

    setCollectionToPreview(collectionToPreview: string): void;
    setPointToPreview(pointToPreview: string | null): void;
    setInterestFilter(interestFilter: string | null): void;
}