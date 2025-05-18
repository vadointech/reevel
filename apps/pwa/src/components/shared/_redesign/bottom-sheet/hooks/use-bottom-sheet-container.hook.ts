import { RefObject, useCallback, useRef, useState } from "react";
import { BoundingBox } from "motion/react";
import { useBottomSheetStore } from "../store";

export type BottomSheetBodyParams = {
    dragBounds: Partial<BoundingBox>,
    contentPosition: RefObject<number>,
};

type BottomSheetBodyRef = (el: HTMLElement | null) => void;

export function useBottomSheetContainer(): [BottomSheetBodyRef, BottomSheetBodyParams] {
    const { rootConfig, snapControls } = useBottomSheetStore();
    const contentPosition = useRef(0);

    const [dragBounds, setDragBounds] = useState<Partial<BoundingBox>>({
        top: snapControls.Top,
        bottom: snapControls.Bottom,
    });
    
    const ref = useCallback((element: HTMLElement | null) => {
        if(!element) return;

        const { clientHeight } = element;
        const position = snapControls.clientHeight - clientHeight;
        contentPosition.current = position;

        if(rootConfig.fitContent) {
            setDragBounds({
                top: position,
                bottom: position,
            });
        }
    }, []);

    return [
        ref, {
            dragBounds,
            contentPosition,
        },
    ] as const;
}