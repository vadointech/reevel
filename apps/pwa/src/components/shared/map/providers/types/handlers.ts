import { MapStore } from "../../map.store";
import { MapProviderCameraState } from "./camera";
import { MapProviderGL } from "./gl";
import { IMapProvider } from "./provider";

export interface IMapHandlers {
    /**
     * A callback function triggered when the map component has been successfully mounted.
     *
     * @param {MapHandlerController} controller - An object that provides methods and properties to interact with the map instance.
     */
    onMapMounted: (
        controller: MapHandlerController
    ) => void;


    /**
     * Callback function that is triggered when the map's viewport changes.
     *
     * @param {MapHandlerViewport} viewport - The updated viewport object containing the new state of the map's view properties.
     */
    onViewportChange: (
        viewport: MapHandlerViewport,
        controller: MapHandlerController
    ) => void;

    /**
     * A callback function that is triggered when a specific point is selected.
     * This function is invoked with the selected point as its parameter.
     *
     * @param {Point<BasePoint>} point - The selected point object containing relevant data.
     */
    onPointSelect: (pointId: string | null) => void;
}

type MapHandlerController = {
    store: MapStore,
    provider: IMapProvider,
};

type MapHandlerViewport = {
    viewState: Partial<MapProviderCameraState.Viewport>,
    bounds: MapProviderGL.LngLatBounds | null,
};