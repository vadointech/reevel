import { MapProviderCameraState } from "./camera";
import { MapInternalConfig } from "@/components/shared/map/types";

export interface IMapHandlers {
    /**
     * Callback function that is triggered when the map is fully loaded and ready for interaction.
     * This method can be used to perform actions such as adding markers, setting map controls,
     * or customizing the map's behavior once it is ready.
     *
     * @return {void} Does not return any value.
     */
    onMapReady(viewState: MapInternalConfig.IViewStateConfig): void;


    /**
     * Callback function that is triggered when the map is detached from the view or component.
     * This method can be used to clean up any resources created during the map's initialization.
     *
     * @return {void} Does not return a value.
     */
    onMapDetach(): void;

    /**
     * Handles the end of a move operation. This method is called when a move
     * action is completed to finalize the operation.
     * @param {Partial<MapProviderCameraState.Viewport>} viewState - The partial viewport state describing the camera's position.
     * @return {void} Does not return a value.
     */
    onMoveEnd(viewState: MapInternalConfig.IViewStateConfig): void;

    /**
     * Handles changes to the viewport, including bounds and view state.
     *
     * @param {Partial<MapProviderCameraState.Viewport>} viewState - The partial viewport state describing the camera's position.
     * @return {void} This method does not return a value; it processes viewport updates.
     */
    onViewportChange(
        viewState: Partial<MapProviderCameraState.Viewport>,
    ): void;

    /**
     * A callback function that is triggered when a specific point is selected.
     * This function is invoked with the selected point as its parameter.
     *
     * @param pointId
     */
    onPointSelect(pointId: string | null): void;
}