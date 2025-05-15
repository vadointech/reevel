import { useCallback, useState } from "react";
import { BoundingBox } from "motion/react";
import { useBottomSheetStore } from "../store";

export function useBottomSheetContainer() {
    const bottomSheetStore = useBottomSheetStore();
    const rootConfig = bottomSheetStore.rootConfig;
    const snapControls = bottomSheetStore.snapControls;

    const [dragBounds, setDragBounds] = useState<Partial<BoundingBox>>({
        top: snapControls.Top,
        bottom: snapControls.Bottom,
    });
    
    const ref = useCallback((element: HTMLDivElement | null) => {
        if(!element) return;
        if(rootConfig.fitContent) {
            const { clientHeight } = element;
            const position = snapControls.clientHeight - clientHeight;
            bottomSheetStore.setContentPosition(position);
            setDragBounds({
                top: position,
                bottom: position,
            });
        }
    }, []);

    return [
        ref, {
            dragBounds,
        },
    ] as const;
}