import { useCallback, useState } from "react";
import { useBottomSheetStore } from "@/components/shared/_redesign/bottom-sheet/store";
import { BoundingBox } from "motion/react";

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
            const rect = element.getBoundingClientRect();
            bottomSheetStore.setContentHeight(rect.height);
            setDragBounds({
                top: snapControls.clientHeight - bottomSheetStore.contentHeight,
                bottom: snapControls.clientHeight,
            });
        }
    }, []);

    return [
        ref, {
            dragBounds,
        },
    ] as const;
}