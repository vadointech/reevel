import { MapProviderCameraState } from "./camera";
import { MapProviderGL } from "./gl";

export interface IMapHandlers {
    /**
     * Callback function that is triggered when the map is fully loaded and ready for interaction.
     * This method can be used to perform actions such as adding markers, setting map controls,
     * or customizing the map's behavior once it is ready.
     *
     * @return {void} Does not return any value.
     */
    onMapReady(): void;
    /**
     * A callback function that handles the changes in the map's viewport by updating the viewport information in the controller.
     *
     * @param {MapHandlerViewport} viewport - The current state of the map's viewport, including dimensions, center point, zoom level, etc.
     * @return {void} This method does not return a value.
     */
    onViewportChange(
        viewport: MapHandlerViewport,
    ): void;

    /**
     * A callback function that is triggered when a specific point is selected.
     * This function is invoked with the selected point as its parameter.
     *
     * @param pointId
     */
    onPointSelect(pointId: string | null): void;
}

type MapHandlerViewport = {
    viewState: Partial<MapProviderCameraState.Viewport>,
    bounds: MapProviderGL.LngLatBounds | null,
};