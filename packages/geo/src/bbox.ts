import { Point } from "./point";
import { IBoundingBox, IPoint, ILngLat } from "./types";

export class BoundingBox implements IBoundingBox {
    sw: ILngLat;
    ne: ILngLat;

    constructor(sw: ILngLat, ne: ILngLat) {
        this.sw = sw;
        this.ne = ne;
    }

    getCenter(): IPoint {
        return new Point(
            (this.sw.lng + this.ne.lng) / 2,
            (this.sw.lat + this.ne.lat) / 2,
        );
    }

    getHorizontalRadius(): number {
        const center = this.getCenter();

        const east = this.ne.lng;
        const west = this.sw.lng;

        const eastPoint = new Point(east, center.lat);
        const westPoint = new Point(west, center.lat);

        return westPoint.distanceTo(eastPoint) / 2;
    }
}