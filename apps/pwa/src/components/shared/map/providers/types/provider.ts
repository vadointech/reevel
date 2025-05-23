import { MapProviderCameraState } from "./camera";
import { MapProviderGL } from "./gl";

export interface IMapProvider {
    /**
     * The `accessToken` is a string used to authenticate requests to the map provider
     */
    accessToken: string;

    /**
     * Moves the view of the map smoothly to the specified coordinates.
     *
     * @param {Array<number>} coordinates - An array containing the latitude and longitude to which the view is moved. The array should be in the format [latitude, longitude].
     * @param {Options} [transitionOptions] - Optional parameters to customize the transition effect, such as duration and easing function.
     * @return {void} This method does not return a value.
     */
    flyTo(coordinates: [number, number], transitionOptions?: MapProviderCameraState.EasingOptions): void;

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
}