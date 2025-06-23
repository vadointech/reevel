"use client";

import { PropsWithChildren } from "react";
import { useAnimation } from "motion/react";

import { useProfileContentSnap } from "./use-content-snap";

import { profileContentDragYPx } from "../motion-values";
import { PROFILE_PAGE_HEADER_HEIGHT_DELTA } from "@/flows/profile/modules/config";

import { ScrollArea } from "@/components/shared/scroll-area";

export namespace ProfilePageContent {
    export type Props = PropsWithChildren;
}

export const ProfilePageContent = ({ children }: ProfilePageContent.Props) => {
    const animate = useAnimation();

    const { handleDragEnd } = useProfileContentSnap(animate);

    return (
        <ScrollArea
            animate={animate}
            style={{ y: profileContentDragYPx }}
            delta={PROFILE_PAGE_HEADER_HEIGHT_DELTA}
            onDragEnd={handleDragEnd}
        >
            { children }
        </ScrollArea>
    );
};
