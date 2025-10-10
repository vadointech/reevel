export interface ILngLat {
    lng: number;
    lat: number;
}

export interface IPoint extends ILngLat {
    /**
     * Calculates the distance between this point and another LngLat point using Haversine formula.
     *
     * @param {ILngLat} other - The other point to calculate distance to
     * @return {number} Distance in meters
     */
    distanceTo(other: ILngLat): number;
}

export interface IBoundingBox {
    sw: ILngLat;
    ne: ILngLat;

    /**
     * Calculates and returns the center point of a geographic region.
     *
     * @return {IPoint} The longitude and latitude representing the center point.
     */
    getCenter(): IPoint

    /**
     * Calculates and returns the horizontal radius based on the given center point.
     *
     * @return {number} The horizontal radius, which is half the distance between the eastern and western longitudes at the given latitude.
     */
    getHorizontalRadius(): number
}