"use client";

import { useCallback, useRef, useState } from "react";
import { useAnimation } from "motion/react";
import {
    BottomSheetPositionControls,
    BottomSheetSnapPointControl,
} from "../controls";
import { IBottomSheetStore } from "../store";
import { BottomSheetRootConfig } from "../config/root.config";

export function useBottomSheetControls(store: IBottomSheetStore, rootConfig: BottomSheetRootConfig) {
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
            store,
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
            store,
        );


        // Binding external controls
        if(rootConfig.externalControls.snapControls) {
            rootConfig.externalControls.snapControls.current = snapControls.current;
        }
        if(rootConfig.externalControls.positionControls) {
            rootConfig.externalControls.positionControls.current = positionControls.current;
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