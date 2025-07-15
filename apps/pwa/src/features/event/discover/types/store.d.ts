import { BasePoint, Point } from "@/components/shared/map/types";

export interface IDiscoverFiltersStore {
    locationInterest: string | undefined;
    setLocationInterest(locationInterest: string | undefined);
}

export interface IDiscoverCollectionStore {
    initialLoad: boolean;
    callbackUrl: string;
    pointToPreview: Point<BasePoint> | undefined;

    setInitialLoad(initialLoad: boolean): void;
    setCallbackUrl(callbackUrl: string): void;
    setPointToPreview(pointToPreview: Point<BasePoint> | undefined): void;
}