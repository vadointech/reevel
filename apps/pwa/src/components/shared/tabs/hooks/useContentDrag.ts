import { RefObject, useEffect, useRef } from "react";
import { PanInfo, useAnimation, useTransform, useMotionValue } from "motion/react";
import { useTabsContext } from "../tabs.context";
import { tabsTransitionParams } from "../config";

import { TabsContentParams } from "../types";

type DragInfo = {
    currentX?: number;
};

type Callback = (index: number, direction: number, info?: DragInfo) => void;

type Callbacks = {
    onDragEnd: Callback;
    onActiveChange: Callback;
    onDragStart: Callback;
};

export function useTabsContentDrag(
    params: RefObject<TabsContentParams>,
    snapPoints: RefObject<number[]>,
    callbacks: Partial<Callbacks> = {},
) {
    const tabs = useTabsContext();
    const direction = useRef<1 | -1>(1);

    const tabsContentAnimate = useAnimation();

    const tabsContentDragX = useMotionValue(0);
    const tabsContentDragXProgress = useTransform(
        tabsContentDragX,
        [0, params.current.scrollWidth],
        [0, 1],
    );

    useEffect(() => {
        tabsContentAnimate.set({
            x: getActiveSnap(tabs.store.activeTabIndex),
        });
    }, []);

    const getActiveIndex = (position: number) => {
        const distances = snapPoints.current.map(point => Math.abs(point + position));
        return distances.indexOf(Math.min(...distances));
    };

    const getActiveSnap = (index: number) => {
        return -snapPoints.current[index];
    };

    const handleDragEnd = (_: any, info: PanInfo) => {
        const position = tabsContentDragX.get() + info.offset.x;

        tabs.store.setActiveTabIndex(
            getActiveIndex(position),
        );

        const newX = getActiveSnap(tabs.store.activeTabIndex);

        callbacks.onDragEnd?.(tabs.store.activeTabIndex, direction.current, {
            ...info,
            currentX: newX,
        });

        tabsContentAnimate.start({
            x: newX,
        }, tabsTransitionParams);
    };

    const handleDrag = (_: any, info: PanInfo) => {
        if (Math.abs(info.offset.y) > Math.abs(info.offset.x)) return;

        direction.current = info.offset.x > 0 ? -1 : 1;

        const position = tabsContentDragX.get() + info.offset.x;
        const activeSnap = getActiveIndex(position);

        if(activeSnap !== tabs.store.activeTabIndex) {
            callbacks.onDragStart?.(tabs.store.activeTabIndex, direction.current);

            tabs.store.setActiveTabIndex(activeSnap);
            callbacks.onActiveChange?.(activeSnap, direction.current);
        }
    };

    const handleDragStart = (_: any, info: PanInfo) => {
        if(Math.abs(info.offset.y) > Math.abs(info.offset.x)) return;
        callbacks.onDragStart?.(tabs.store.activeTabIndex, direction.current);
    };

    const scrollTo = (index: number) => {
        direction.current = index > tabs.store.activeTabIndex ? 1 : -1;

        callbacks.onDragStart?.(tabs.store.activeTabIndex, direction.current);
        callbacks.onActiveChange?.(index, direction.current);

        tabs.store.setActiveTabIndex(index);
        const newX = -snapPoints.current[tabs.store.activeTabIndex];

        callbacks.onDragEnd?.(index, direction.current, {
            currentX: newX,
        });

        tabsContentAnimate.start({
            x: newX,
        }, tabsTransitionParams);
    };

    return {
        direction,
        tabsContentAnimate,
        tabsContentDragX,
        tabsContentDragXProgress,

        scrollTo,
        handleDrag,
        handleDragEnd,
        handleDragStart,
        getActiveIndex,
        getActiveSnap,
    };
}