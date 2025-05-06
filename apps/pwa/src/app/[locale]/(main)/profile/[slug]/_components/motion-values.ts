import { motionValue } from "motion";
import { useTransform } from "motion/react";

export const profileContentDragYPx = motionValue(0);
export function useProfileContentDragYProgress() {
    return useTransform(
        profileContentDragYPx,
        (val) => {
            return val > 0 ? 0 : val * -1;
        },
    );
}