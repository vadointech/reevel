import { RefObject } from "react";
import { MapInternalConfig } from "../provider/config";
import { IMapHandlers } from "../provider/handlers";
import { BasePoint, Point } from "../point/point";

export interface IMapRootController {
    externalHandlers: Partial<IMapHandlers>

    /**
     * Attaches a map to the specified container and binds the provided event handlers.
     *
     * @param {RefObject<HTMLElement | null>} container - A reference to the HTML element where the map will be attached. Can be `null`.
     * @param init
     * @return {void} This method does not return a value.
     */
    attachMap(
        container: RefObject<HTMLElement | null>,
        init: Partial<{
            points: Point<BasePoint>[],
            viewState?: Partial<MapInternalConfig.IViewStateConfig>,
            handlers?: Partial<IMapHandlers>,
        }>
    ): void;

    /**
     * Attaches the provided handlers to the corresponding events on the map.
     *
     * @param {Partial<IMapHandlers>} handlers - An object containing the event handlers to be attached. Each key in the object corresponds to an event type, and the value is the handler function for that event. Only the specified keys will be attached.
     * @return {void} This method does not return a value.
     */
    attachHandlers(handlers: Partial<IMapHandlers>): void;


    detachHandlers(handlers: Array<keyof IMapHandlers>): void;

    /**
     * A function that detaches or removes a mapped relationship or reference within a data structure.
     * Typically used to disassociate or clean up mappings within a program.
     */
    detachMap(): void;

    syncViewState(viewState: MapInternalConfig.IViewStateConfig, forceRefresh?: boolean): void;

    /**
     * Selects a specific point by its identifier.
     *
     * @param {string | null} pointId - The unique identifier of the point to be selected. If null, no specific point will be selected.
     * @return {void} This method does not return a value.
     */
    selectPoint(pointId: string | null): void;

    /**
     * Sets the points to the given list of points.
     *
     * @param {Point<BasePoint>[]} points - An array of Point<BasePoint> objects to be set.
     * @return {void} This method does not return a value.
     */
    setPoints(points: Point<BasePoint>[]): void;

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