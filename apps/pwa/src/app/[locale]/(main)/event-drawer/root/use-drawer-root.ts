import { AnimationControls, PanInfo } from "motion/react";
import {
    setActiveSnapPoint,
    snapControls,
    determineSnapPoint,
} from "./snap-controls";

export function useDrawerRoot(animate: AnimationControls) {
    const handleDragEnd = (_: any, info: PanInfo) => {
        const position = info.point.y;
        const velocity = info.velocity.y;

        const snapIndex = determineSnapPoint(velocity, position);

        setActiveSnapPoint(snapIndex);

        animate.start({ y: snapControls.getSnapPointValue(snapIndex) }, {
            type: "tween",
            duration: 0.15,
            ease: "easeOut",
        });
    };
    
    return {
        handleDragEnd,
    };
}