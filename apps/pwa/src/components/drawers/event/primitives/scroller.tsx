"use client";

import { useEffect, useRef, useState, PropsWithChildren, PointerEvent } from "react";
import { BoundingBox, motion, useDragControls } from "motion/react";
import { useBottomSheet } from "@/components/shared/bottom-sheet";
import { useEventDrawerContext } from "@/components/drawers/event/event-drawer.context";

export namespace EventDrawerContentScroller {
    export type Props = PropsWithChildren;
}

export const EventDrawerContentScroller = ({ children }: EventDrawerContentScroller.Props) => {
    const { drawerContentDragYPx, config } = useEventDrawerContext();

    const bottomSheet = useBottomSheet();
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const [dragBounds, setDragBounds] = useState<BoundingBox | undefined>(undefined);

    useEffect(() => {
        const element = scrollerRef.current;
        if(!element) return;

        const calculateBounds = () => {
            const offset =
              bottomSheet.controller.current.internalConfig.clientHeight -
              bottomSheet.controller.current.dragConstraints.top -
              element.clientHeight -
              config.heroSectionOffset;

            setDragBounds({
                top: offset,
                bottom: 0,
                left: 0,
                right: 0,
            });
        };

        const observer = new ResizeObserver(calculateBounds);
        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    const dragControls = useDragControls();
    
    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if(bottomSheet.store.activeSnapPoint === 0) {
            dragControls.start(event);
        } else {
            bottomSheet.controller.current.dragControls.start(event);
        }
        event.stopPropagation();
    };

    return (
        <motion.div
            ref={scrollerRef}
            drag={"y"}
            dragListener={false}
            dragElastic={.3}
            dragDirectionLock
            dragControls={dragControls}
            style={{ y: drawerContentDragYPx }}
            dragConstraints={dragBounds}
            onPointerDown={handlePointerDown}
        >
            { children }
        </motion.div>
    );
};
