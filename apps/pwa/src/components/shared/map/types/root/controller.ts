import { RefObject } from "react";
import { BasePoint, Point } from "@/components/shared/map/types/root/point";
import { IMapStore } from "@/components/shared/map/map.store";
import { IMapHandlers, MapProviderCameraState } from "../../providers/mapbox/types";

export interface IMapRootController {
    store: IMapStore;
    externalHandlers: Partial<IMapHandlers>

    /**
     * Attaches a map to the specified container and binds the provided event handlers.
     *
     * @param {RefObject<HTMLElement | null>} container - A reference to the HTML element where the map will be attached. Can be `null`.
     * @param viewState
     * @param {Partial<IMapHandlers>} handlers - A partial object containing event handlers for interacting with the map.
     * @return {void} This method does not return a value.
     */
    attachMap(
        container: RefObject<HTMLElement | null>,
        viewState?: Partial<MapProviderCameraState.Viewport>,
        handlers?: Partial<IMapHandlers>,
    ): void;

    /**
     * A function that detaches or removes a mapped relationship or reference within a data structure.
     * Typically used to disassociate or clean up mappings within a program.
     */
    detachMap(): void;

    /**
     * Selects a point based on the provided pointId.
     * If the pointId is null, it may deselect or reset the selection.
     *
     * @param {string | null} pointId - The identifier of the point to select, or null to reset selection.
     * @return {void} No return value.
     */
    selectPoint(pointId: string | null): void;

    /**
     * Appends an array of points to the existing collection of points.
     *
     * @param {Point<BasePoint>[]} point - An array of points to add to the collection. Each point must be an instance of Point<BasePoint>.
     * @return {void} This method does not return a value.
     */
    appendPoints(point: Point<BasePoint>[]): void;

    /**
     * Replaces the current points with a new set of points, optionally delaying the process for a specified duration.
     *
     * @param {Point<BasePoint>[]} points - The new array of points to replace the current points.
     * @param {number} [duration=500] - The duration in milliseconds to delay the replacement.
     * Make sure duration is equal animation duration of the markers itself
     * @return {Promise<void>} A promise that resolves after the points have been replaced and the specified delay has elapsed.
     */
    replacePoints(points: Point<BasePoint>[], duration?: number): Promise<void>
}