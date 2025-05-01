import { motionValue } from "motion";
import { useTransform } from "motion/react";
import { snapControls } from "@/app/[locale]/(main)/event-drawer/root/snap-controls/snap-controls";

export const drawerDragYPx = motionValue(0);
export function useDrawerDragYProgress() {
    return useTransform(
        drawerDragYPx,
        [snapControls.High, snapControls.Low],
        [1, 0],
    );
}

export const drawerContentDragYPx = motionValue(0);
export function useDrawerContentDragYProgress() {
    return useTransform(
        drawerContentDragYPx,
        (val) => {
            return val > 0 ? 0 : val * -1;
        },
    );
}
export function useDrawerContentOverscrollYProgress() {
    return useTransform(
        drawerContentDragYPx,
        (val) => {
            return val > 0 ? val : 0;
        },
    );
}