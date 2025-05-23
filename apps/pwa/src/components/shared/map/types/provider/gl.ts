export namespace MapProviderGL {
    export interface LngLat {
        lng: number;
        lat: number;

        /** Returns the approximate distance between a pair of coordinates in meters
         * Uses the Haversine Formula (from R.W. Sinnott, "Virtues of the Haversine", Sky and Telescope, vol. 68, no. 2, 1984, p. 159)
         */
        distanceTo(lngLat: LngLat): number;
    }
    export interface LngLatBounds {
        /** Check if the point is within the bounding box. */
        contains(lnglat: LngLat): boolean;
        /**
         * Returns the geographical coordinate equidistant from the bounding box's corners.
         */
        getCenter(): LngLat;
        /**
         * Returns the southwest corner of the bounding box.
         */
        getSouthWest(): LngLat;
        /**
         * Returns the northeast corner of the bounding box.
         */
        getNorthEast(): LngLat;
        /**
         * Returns the northwest corner of the bounding box.
         */
        getNorthWest(): LngLat;
        /**
         * Returns the southeast corner of the bounding box.
         */
        getSouthEast(): LngLat;
        /**
         * Returns the west edge of the bounding box.
         */
        getWest(): number;
        /**
         * Returns the south edge of the bounding box.
         */
        getSouth(): number;
        /**
         * Returns the east edge of the bounding box.
         */
        getEast(): number;
        /**
         * Returns the north edge of the bounding box.
         */
        getNorth(): number;
    }
}