import { IMarkerStore } from "../types";
import { action, makeObservable, observable } from "mobx";

export class MarkerStore implements IMarkerStore {
    selectedMarker: string | null = null;

    constructor() {
        makeObservable(this, {
            selectedMarker: observable,
            setMarker: action,
            getMarkerId: action,
            getMarkerPositionById: action,
        });
    }
  
    setMarker(markerId: string | null): void {
        this.selectedMarker = markerId;
    }

    getMarkerId(point: [number, number]): string {
        return point.join(":");
    }

    getMarkerPositionById(id: string): [number, number] {
        const [lng, lat] = id.split(":");
        return [Number(lng), Number(lat)];
    }
}

export const markerStore = new MarkerStore();