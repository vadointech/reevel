import { RefObject } from "react";
import { MapProviderCameraState } from "./camera";
import { MapProviderGL } from "./gl";

export type MapProviderInitialViewState = {
    pitch: number;
    zoom: number;
    center: [number, number];
    padding: MapProviderCameraState.PaddingOptions;
    bboxPolygon: MapProviderGL.LngLatPolygon;
};

export type MapProviderConfig = {
    accessToken: string;
    mapStyleDark: string;
    mapStyleLight: string;
    initialViewState: Partial<MapProviderInitialViewState>;
};

export interface IMapProvider {
    mapRef: RefObject<any>
    config: MapProviderConfig;

    /**
     * Initializes the given map reference, setting up necessary configurations or subscriptions.
     *
     * @param {RefObject<any>} [mapRef] - An optional reference object of the map to initialize.
     * @return {void} Does not return any value.
     */
    initialize(mapRef?: RefObject<any>): void;

    /**
     * Synchronizes the current view state with the provided partial viewport configuration.
     *
     * @return {void} This method does not return a value.
     */
    syncViewState(
        viewState?: Partial<MapProviderCameraState.Viewport>,
        options?: MapProviderCameraState.EasingOptions
    ): void;

    /**
     * Moves the view of the map smoothly to the specified coordinates.
     *
     * @return {void} This method does not return a value.
     */
    flyTo(options?: MapProviderCameraState.EasingOptions): void;

    /**
     * Adjusts the view of the map to fit the provided geographical bounds with optional configuration settings.
     *
     * @param {number[]} bounds - An array representing the bounding box in the format [southWestLng, southWestLat, northEastLng, northEastLat].
     * @param {Options} [transitionOptions] - Optional settings to control the behavior of the fit operation, such as animation or padding.
     * @return {void} This method does not return any value.
     */
    fitBounds(bounds: [number, number, number, number], transitionOptions?: MapProviderCameraState.EasingOptions): void;

    /**
     * Sets the padding for the map view.
     * Adjusts the map's viewport based on the provided padding values.
     *
     * @param {Partial<MapProviderCameraState.PaddingOptions>} padding - An object specifying the padding values to be applied, such as top, left, right, or bottom.
     * @param {Options} [transitionOptions] - Optional settings to control the behavior of the fit operation, such as animation or padding.
     * @return {void} This method does not return a value.
     */
    setPadding(padding: Partial<MapProviderCameraState.PaddingOptions>, transitionOptions?: MapProviderCameraState.EasingOptions): void;

    /**
     * Retrieves the geographical bounds of the map in longitude and latitude coordinates.
     *
     * @return {MapProviderGL.LngLatBounds | null} Returns the boundaries of the map as a LngLatBounds object, or null if the bounds cannot be determined.
     */
    getBounds(): MapProviderGL.LngLatBounds | null;

    /**
     * Creates a new set of geographical bounds by applying a buffer percentage to the geographical.
     *
     * @param {number} [bufferPercentage=0.2] - The percentage of buffering to apply to the bounds.
     * @return {MapProviderGL.LngLatBounds} - A new LngLatBounds object with buffered coordinates.
     */
    getBufferedBounds(bufferPercentage: number): MapProviderGL.LngLatBounds | null;

    /**
     * Calculates the radius from the center point to the bounds' horizontal distance.
     *
     * @param {MapProviderGL.LngLatBounds} bounds - The geographical bounds representing the area.
     * @param {MapProviderGL.LngLat} center - The geographical center point to calculate the radius from.
     * @return {number} The calculated radius based on the horizontal distance of the bounds.
     */
    getHorizontalRadius(bounds: MapProviderGL.LngLatBounds, center: MapProviderGL.LngLat): number;

    /**
     * Converts a polygon into a bounding box that fully contains the polygon.
     *
     * @param {MapProviderGL.LngLatPolygon} polygon - The polygon to be converted into bounds.
     * @return {MapProviderGL.LngLatBounds} The bounding box that encompasses the entire polygon.
     */
    polygonToBounds(polygon: MapProviderGL.LngLatPolygon): MapProviderGL.LngLatBounds
}