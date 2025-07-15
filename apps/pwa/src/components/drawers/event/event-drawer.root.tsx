"use client";

import { PropsWithChildren } from "react";
import { useMotionValue, useTransform } from "motion/react";
import { EventDrawerContext } from "./event-drawer.context";
import {
    BottomSheetBody,
    BottomSheetContent,
    BottomSheetPortal,
    BottomSheetRoot,
} from "@/components/shared/bottom-sheet";

import { EventDrawerConfigParams } from "./types";

export namespace EventDrawerRoot {
    export type Props = PropsWithChildren<EventDrawerConfigParams>;
}

export const EventDrawerRoot = ({
    children,
    callbackUrl,
    heroSectionOffset = 350,
}: EventDrawerRoot.Props) => {
    const drawerDragYProgress = useMotionValue(0);
    const drawerContentDragYPx = useMotionValue(0);

    const drawerContentDragYProgress = useTransform(
        drawerContentDragYPx,
        (val) => {
            return val > 0 ? 0 : val * -1;
        },
    );

    return (
        <EventDrawerContext.Provider
            value={{
                drawerDragYProgress,
                drawerContentDragYPx,
                drawerContentDragYProgress,
                config: { heroSectionOffset, callbackUrl },
            }}
        >
            <BottomSheetRoot
                handleOnly
                defaultOpen
                touchEvents
                dismissible={false}
                snapPoints={[.95, .5, .14]}
                fadeThreshold={.6}
                defaultSnapPointIndex={0}
            >
                <BottomSheetPortal>
                    <BottomSheetBody dragYProgress={drawerDragYProgress}  style={{ height: "100%" }}>
                        <BottomSheetContent>
                            { children }
                        </BottomSheetContent>
                    </BottomSheetBody>
                </BottomSheetPortal>
            </BottomSheetRoot>
        </EventDrawerContext.Provider>
    );
};