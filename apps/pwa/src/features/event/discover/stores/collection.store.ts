import { IDiscoverCollectionStore } from "../types";
import { BasePoint, Point } from "@/components/shared/map/types";

export class DiscoverCollectionStore implements IDiscoverCollectionStore {
    initialLoad: boolean = true;

    callbackUrl: string = "/discover";
    pointToPreview: Point<BasePoint> | undefined = undefined;

    setInitialLoad(initialLoad: boolean) {
        this.initialLoad = initialLoad;
    }

    setCallbackUrl(callbackUrl: string) {
        this.callbackUrl = callbackUrl;
    }

    setPointToPreview(pointToPreview: Point<BasePoint> | undefined) {
        this.pointToPreview = pointToPreview;
    }
}