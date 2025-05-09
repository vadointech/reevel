"use client";

import { PropsWithChildren, useRef } from "react";
import { motion, useAnimation } from "motion/react";

import { useProfileContentSnap } from "./use-content-snap";
import { profileContentDragYPx } from "../motion-values";

export namespace ProfilePageContent {
    export type Props = PropsWithChildren;
}

export const ProfilePageContent = ({ children }: ProfilePageContent.Props) => {
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const animate = useAnimation();

    const { handleDragEnd } = useProfileContentSnap(animate);

    return (
        <div ref={scrollerRef} style={{ width: "100%", height: "100%" }}>
            <motion.div
                drag={"y"}
                style={{ y: profileContentDragYPx }}
                animate={animate}
                dragDirectionLock
                onDragEnd={handleDragEnd}
                dragConstraints={scrollerRef}
            >
                { children }
            </motion.div>
        </div>
    );
};
