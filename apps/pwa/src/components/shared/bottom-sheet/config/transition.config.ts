import { Transition } from "motion";
import { lerp, normalize } from "@/utils/normalize";

export function generateBottomSheetTransitionParams(target: number, start: number = 0, max: number = 600): Transition {
    const distance = Math.abs(target - start);
    const normalized = normalize(0, max, distance);

    const minDuration = 0.35;
    const maxDuration = 0.55;
    const duration = lerp(minDuration, maxDuration, normalized);

    return {
        type: "tween",
        duration,
        ease: [0.22, 1, 0.36, 1],
    };
}