"use client";

import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { observer } from "mobx-react-lite";

import { drawerContentDragYPx } from "../../root";
import { activeSnapPoint, snapControls } from "../../root/snap-controls";
import { HERO_SECTION_OFFSET } from "../../root/snap-controls";

export namespace EventDrawerContentScroller {
    export type Props = {
        children: ReactNode
    };
}

export const EventDrawerContentScroller = observer(({ children }: EventDrawerContentScroller.Props) => {

    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const [contentScrollHeight, setContentScrollHeight] = useState(0);

    useLayoutEffect(() => {
        if(scrollerRef.current) {
            setContentScrollHeight(
                snapControls.clientHeight - scrollerRef.current.clientHeight - snapControls.High - HERO_SECTION_OFFSET,
            );
        }
    }, []);

    const dragListeners = activeSnapPoint.get() === 0;

    return (
        <motion.div
            ref={scrollerRef}
            drag={"y"}
            style={{ y: drawerContentDragYPx }}
            onClick={(e) => e.stopPropagation()}
            dragListener={dragListeners}
            dragConstraints={{
                top: contentScrollHeight,
                bottom: 0,
            }}
        >
            { children }
            <div style={{ height: 1000, background: "white"}} />
        </motion.div>
    );
});
