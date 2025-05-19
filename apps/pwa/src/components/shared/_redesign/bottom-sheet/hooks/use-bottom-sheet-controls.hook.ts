"use client";

import { RefObject, useCallback, useRef, useState } from "react";
import { useAnimation } from "motion/react";
import {
    BottomSheetPositionControls,
    BottomSheetSnapPointControl,
} from "../controls";
import { BottomSheetRootConfig } from "../config/root.config";

export type BottomSheetExternalControls = {
    snapControls: RefObject<BottomSheetSnapPointControl | null>;
    positionControls: RefObject<BottomSheetPositionControls | null>;
};

export function useBottomSheetControls(
    rootConfig: BottomSheetRootConfig,
    externalControls: Partial<BottomSheetExternalControls> = {},
) {
    const containerAnimate = useAnimation();

    const [initialized, setInitialized] = useState(false);

    const snapControls = useRef<BottomSheetSnapPointControl>(
        new BottomSheetSnapPointControl(
            rootConfig,
            0,
            window.innerHeight,
        ),
    );
    const positionControls = useRef<BottomSheetPositionControls>(
        new BottomSheetPositionControls(
            containerAnimate,
            snapControls.current,
        ),
    );

    const containerRef = useCallback((element: HTMLElement | null) => {
        if(!element) return;

        const { clientHeight } = element;
        const containerHeight = window.innerHeight - clientHeight;

        snapControls.current = new BottomSheetSnapPointControl(
            rootConfig,
            containerHeight,
            window.innerHeight,
        );

        positionControls.current = new BottomSheetPositionControls(
            containerAnimate,
            snapControls.current,
        );

        /**
         * Bing external controls
         */
        if(externalControls.snapControls) {
            externalControls.snapControls.current = snapControls.current;
        }
        if(externalControls.positionControls) {
            externalControls.positionControls.current = positionControls.current;
        }

        setInitialized(true);
    }, []);

    return {
        initialized,
        containerRef,
        snapControls,
        positionControls,
        containerAnimate,
    };
}