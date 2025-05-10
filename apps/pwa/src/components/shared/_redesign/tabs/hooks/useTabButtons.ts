import { useEffect, useRef } from "react";
import { useAnimation } from "motion/react";

import { normalize } from "../utils";
import { useTabsStore } from "../tabs.store";
import { useTabsOverlayInterpolate } from "./useOverlayInterpolate";

export type EstimatedTabRef = {
    element: HTMLButtonElement | null;
    index: number;
};

export function useTabButtons() {
    const tabsStore = useTabsStore();

    const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

    const tabButtonOverlayAnimate = useAnimation();
    const interpolateOverlay = useTabsOverlayInterpolate();

    useEffect(() => {
        const tab = tabsRef.current[tabsStore.activeTabIndex];
        if(tab) {
            tabButtonOverlayAnimate.set({
                x: tab.offsetLeft,
                width: tab.offsetWidth,
            });
        }
    }, []);

    const startTabRef = useRef<EstimatedTabRef>({
        element: tabsRef.current[0],
        index: 0,
    });

    const targetTabRef = useRef<EstimatedTabRef>({
        element: tabsRef.current[1],
        index: 1,
    });

    const setStartTabRef = (index: number) => {
        startTabRef.current = {
            index,
            element: tabsRef.current[index],
        };
    };

    const setTargetTabRef = (index: number) => {
        targetTabRef.current = {
            index: index,
            element: tabsRef.current[index],
        };
    };

    const normalizeProgress = (progress: number) => {
        const count = tabsRef.current.length;

        return normalize(
            (1 / count) * (startTabRef.current.index),
            (1 / count) * (targetTabRef.current.index),
            progress,
        );
    };

    const animateTabsButtonOverlay = (progress: number) => {
        const params = interpolateOverlay(
            startTabRef.current,
            targetTabRef.current,
            normalizeProgress(progress),
        );

        if(params) tabButtonOverlayAnimate.set(params);
    };

    return {
        tabsRef,
        startTabRef,
        targetTabRef,
        tabButtonOverlayAnimate,
        setStartTabRef,
        setTargetTabRef,
        normalizeProgress,
        animateTabsButtonOverlay,
    };
}