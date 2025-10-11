import { Point } from "./point";
import { IBoundingBox, IPoint, ILngLat } from "./types";

export class BoundingBox implements IBoundingBox {
    sw: ILngLat;
    ne: ILngLat;

    constructor(sw: ILngLat, ne: ILngLat) {
        this.sw = sw;
        this.ne = ne;
    }

    static fromPolygon(polygon: number[][][]): IBoundingBox {
        const [
            [swLng, swLat], // SW corner
            , // NW corner
            [neLng, neLat], // NE corner
            , // SE corner
            , // Back to SW to close polygon
        ] = polygon[0];

        return new BoundingBox({ lng: swLng, lat: swLat }, { lng: neLng, lat: neLat });
    }

    getCenter(): IPoint {
        return new Point(
            (this.sw.lng + this.ne.lng) / 2,
            (this.sw.lat + this.ne.lat) / 2,
        );
    }

    getRadius(): number {
        const center = this.getCenter();

        const east = this.ne.lng;
        const west = this.sw.lng;

        const eastPoint = new Point(east, center.lat);
        const westPoint = new Point(west, center.lat);

        return westPoint.distanceTo(eastPoint) / 2;
    }
    
    getPolygon(): number[][][] {
        return [[
            [this.sw.lng, this.sw.lat], // SW corner
            [this.sw.lng, this.ne.lat], // NW corner
            [this.ne.lng, this.ne.lat], // NE corner
            [this.ne.lng, this.sw.lat], // SE corner
            [this.sw.lng, this.sw.lat], // Back to SW to close polygon
        ]];
    };
}