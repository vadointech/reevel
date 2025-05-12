import { EstimatedTabRef } from "./useTabButtons";
import { lerp } from "@/utils/normalize";

export function useTabsOverlayInterpolate() {
    return (from: EstimatedTabRef, to: EstimatedTabRef, localProgress: number) => {
        if(!from.element || !to.element) return;

        const startPosition = from.element.offsetLeft;
        const targetPosition = to.element.offsetLeft;
        const startWidth = from.element.offsetWidth;
        const targetWidth = to.element.offsetWidth;

        const x = lerp(
            startPosition,
            targetPosition,
            localProgress,
        );

        const width = lerp(
            startWidth,
            targetWidth,
            localProgress,
        );

        return { x, width };
    };
}