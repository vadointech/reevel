import { activeSnapPoint } from "./observable";
import { snapControls } from "./snap-controls";

export function determineSnapPoint(velocity: number, position: number) {
    if (Math.abs(velocity) > 200) {
        if (velocity > 0) {
            return Math.min(activeSnapPoint.get() + 1, snapControls.snapPointsCount - 1);
        } else {
            return Math.max(activeSnapPoint.get() - 1, 0);
        }
    }

    const currentPosition = (snapControls.clientHeight - position) / snapControls.clientHeight;
    const distances = snapControls.snapPointsArray.map(point => Math.abs(point - currentPosition));
    return distances.indexOf(Math.min(...distances));
}