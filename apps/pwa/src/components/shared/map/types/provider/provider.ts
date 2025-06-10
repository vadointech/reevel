import { RefObject } from "react";
import { MapInternalConfig } from "./config";
import { MapProviderCameraState } from "./camera";
import { MapProviderGL } from "./gl";

export interface IMapRootProvider {
    internalConfig: MapInternalConfig.IInternalConfig;
    defaultConfig: MapInternalConfig.IInternalConfig;

    /**
     * Calculates the radius from the center point to the bounds' horizontal distance.
     *
     * @param {MapProviderGL.LngLatBounds} bounds - The geographical bounds representing the area.
     * @param {MapProviderGL.LngLat} center - The geographical center point to calculate the radius from.
     * @return {number} The calculated radius based on the horizontal distance of the bounds.
     */
    getHorizontalRadius(bounds: MapProviderGL.LngLatBounds, center: MapProviderGL.LngLat): number;


    /**
     * Creates a new set of geographical bounds by applying a buffer percentage to the geographical.
     *
     * @param {MapProviderGL.LngLatBounds} bounds - The geographical bounds representing the area.
     * @param {number} [bufferPercentage=0.2] - The percentage of buffering to apply to the bounds.
     * @return {MapProviderGL.LngLatBounds} - A new LngLatBounds object with buffered coordinates.
     */
    getBufferedBounds(bounds: MapProviderGL.LngLatBounds, bufferPercentage?: number): MapProviderGL.LngLatBounds;

    /**
     * Calculates the distance between two geographical points.
     *
     * @param {MapProviderGL.LngLat} p1 - The first geographical point with longitude and latitude.
     * @param {MapProviderGL.LngLat} p2 - The second geographical point with longitude and latitude.
     * @return {number} The distance between the two points in meters.
     */
    getDistance(p1: MapProviderGL.LngLatLike, p2: MapProviderGL.LngLatLike): number;

    /**
     * Calculates the duration of the animation based on the distance between two points.
     *
     * @param {MapProviderGL.LngLat} p1 - The first geographical point with longitude and latitude.
     * @param {MapProviderGL.LngLat} p2 - The second geographical point with longitude and latitude.
     */
    getDynamicDuration(p1: MapProviderGL.LngLatLike, p2: MapProviderGL.LngLatLike): number;
}

export interface IMapProvider extends IMapRootProvider {
    mapRef: RefObject<any>

    /**
     * Initializes the given map reference, setting up necessary configurations or subscriptions.
     *
     * @param {RefObject<any>} [mapRef] - An optional reference object of the map to initialize.
     * @return {void} Does not return any value.
     */
    initialize(mapRef?: RefObject<any>): void;

    /**
     * Resets the view state of the map to the specified configurations.
     * By default, this method will reset the view state to the default configurations.
     *
     * @param {Partial<MapInternalConfig.IViewStateConfig>} [viewState] - An optional parameter containing partial configuration for the map's view state. If not provided, default configurations will be applied.
     * @param {MapProviderCameraState.EasingOptions} [options] - An optional parameter specifying easing options for animating the view state transition.
     * @return {void} No return value as this method applies changes directly to the map's view state.
     */
    resetViewState(
        viewState?: Partial<MapInternalConfig.IViewStateConfig>,
        options?: MapProviderCameraState.EasingOptions
    ): void;

    getViewState(): MapInternalConfig.IViewStateConfig;

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
    fitBounds(bounds: MapProviderGL.LngLatBoundsLike, transitionOptions?: MapProviderCameraState.EasingOptions): void;

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
    getBounds(): MapProviderGL.LngLatBounds;

    getZoom(zoom?: number): number;
}