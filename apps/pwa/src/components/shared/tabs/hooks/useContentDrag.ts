import { RefObject, useEffect, useRef } from "react";
import { PanInfo, useAnimation, useTransform, useMotionValue } from "motion/react";
import { tabsTransitionParams } from "../config";
import { useTabsStore } from "../tabs.store";

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
    const tabsStore = useTabsStore();
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
            x: getActiveSnap(tabsStore.activeTabIndex),
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

        tabsStore.setActiveTabIndex(
            getActiveIndex(position),
        );

        const newX = getActiveSnap(tabsStore.activeTabIndex);

        callbacks.onDragEnd?.(tabsStore.activeTabIndex, direction.current, {
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

        if(activeSnap !== tabsStore.activeTabIndex) {
            callbacks.onDragStart?.(tabsStore.activeTabIndex, direction.current);

            tabsStore.setActiveTabIndex(activeSnap);
            callbacks.onActiveChange?.(activeSnap, direction.current);
        }
    };

    const handleDragStart = (_: any, info: PanInfo) => {
        if(Math.abs(info.offset.y) > Math.abs(info.offset.x)) return;
        callbacks.onDragStart?.(tabsStore.activeTabIndex, direction.current);
    };

    const scrollTo = (index: number) => {
        direction.current = index > tabsStore.activeTabIndex ? 1 : -1;

        callbacks.onDragStart?.(tabsStore.activeTabIndex, direction.current);
        callbacks.onActiveChange?.(index, direction.current);

        tabsStore.setActiveTabIndex(index);
        const newX = -snapPoints.current[tabsStore.activeTabIndex];

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