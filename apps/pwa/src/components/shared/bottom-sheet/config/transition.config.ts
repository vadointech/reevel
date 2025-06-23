import { Transition } from "motion";
import { lerp } from "@/utils/normalize";

export function generateBottomSheetTransitionParams(target: number, start: number = 0): Transition {
    const distance = Math.abs(target - start);

    const minDuration = 0.25;
    const maxDuration = .45;
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