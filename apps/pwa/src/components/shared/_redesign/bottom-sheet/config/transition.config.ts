import { Transition } from "motion";
import { lerp } from "@/utils/normalize";

export function generateBottomSheetExitTransitionParams(target: number): Transition {
    const minDuration = 0.15;
    const maxDuration = .4;
    const duration = lerp(
        minDuration,
        maxDuration,
        target,
    );

    return {
        type: "tween",
        duration: duration,
        ease: "easeOut",
    };
}

export function generateBottomSheetTransitionParams(start: number, target: number): Transition {
    const distance = Math.abs(target - start);

    const minDuration = 0.15;
    const maxDuration = .25;
    const duration = lerp(
        minDuration,
        maxDuration,
        distance,
    );

    return {
        type: "tween",
        duration: duration,
        ease: "easeOut",
    };
}