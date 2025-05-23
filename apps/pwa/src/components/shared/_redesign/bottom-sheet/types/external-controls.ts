import { RefObject } from "react";
import { BottomSheetPositionControls, BottomSheetSnapPointControl } from "../controls";
import { IBottomSheetStore } from "../store";

export interface IBottomSheetExternalControls {
    storeControls: RefObject<IBottomSheetStore | null>
    /**
     * A React ref object that provides a reference to a `BottomSheetSnapPointControl`.
     * The reference can be used to interact with or control the snap points
     * of a bottom sheet component in a React application.
     *
     * It holds the current instance of `BottomSheetSnapPointControl`,
     * or null if no instance is assigned.
     *
     * @type {RefObject<BottomSheetSnapPointControl | null>}
     */
    snapControls: RefObject<BottomSheetSnapPointControl | null>;

    /**
     * A React ref object that provides a reference to a `BottomSheetPositionControls`.
     * The reference can be used to interact with or control the snap points
     * of a bottom sheet component in a React application.
     *
     * It holds the current instance of `BottomSheetPositionControls`,
     * or null if no instance is assigned.
     *
     * @type {RefObject<BottomSheetSnapPointControl | null>}
     */
    positionControls: RefObject<BottomSheetPositionControls | null>;
}