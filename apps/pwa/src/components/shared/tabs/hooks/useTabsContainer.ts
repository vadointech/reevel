import { useCallback, useRef, useState } from "react";
import { BoundingBox, useAnimation, useMotionValue } from "motion/react";
import { tabsTransitionParams } from "@/components/shared/tabs/config";

export function useTabsContainer() {
    const [tabsContainerDragBounds, setTabsContainerDragBounds] = useState<Partial<BoundingBox>>();

    const tabsContainerRef = useRef<HTMLDivElement | null>(null);
    const tabsContainerRefHandler = useCallback((element: HTMLDivElement | null) => {
        if(!element) return;
        tabsContainerRef.current = element;
        setTabsContainerDragBounds({
            left: element.clientWidth - element.scrollWidth,
            right: 0,
        });
    }, []);

    const isTabsContainerDrag = useRef(false);

    const handleTabsContainerDragStart = () => {
        isTabsContainerDrag.current = true;
    };

    const handleTabsContainerDragEnd = () => {
        isTabsContainerDrag.current = false;
    };

    const tabsContainerAnimate = useAnimation();
    const tabsContainerDragX = useMotionValue(0);

    const handleTabsContainerDragSnapTo = (target: HTMLButtonElement, direction: number, index: number) => {
        const tabsContainer = tabsContainerRef.current;
        if (!tabsContainer) {
            return;
        }

        const tabOffsetLeft = target.offsetLeft;
        const tabOffsetWidth = target.offsetWidth;
        const containerWidth = tabsContainer.offsetWidth;
        const currentScrollX = tabsContainerDragX.get() * -1;

        let newScrollX = currentScrollX;

        const tabStart = tabOffsetLeft;
        const tabEnd = tabOffsetLeft + tabOffsetWidth;
        const visibleStart = currentScrollX;
        const visibleEnd = currentScrollX + containerWidth;

        const isFullyVisible = tabStart >= visibleStart && tabEnd <= visibleEnd;

        if (!isFullyVisible) {
            if (direction < 0) {
                // Bind to the left edge
                if(index === 0) {
                    newScrollX = 0;
                } else {
                    newScrollX = tabStart;
                }
            } else if (direction > 0) {
                // Bind to the right edge
                newScrollX = Math.max(0, tabEnd - containerWidth);
            }
        }

        const maxScrollX = Math.max(0, tabsContainer.scrollWidth - containerWidth);
        newScrollX = Math.max(0, Math.min(newScrollX, maxScrollX));

        tabsContainerAnimate.start({
            x: -newScrollX,
        }, tabsTransitionParams);
    };

    return {
        tabsContainerDragX,
        tabsContainerAnimate,
        isTabsContainerDrag,
        tabsContainerRef,
        tabsContainerDragBounds,
        tabsContainerRefHandler,
        handleTabsContainerDragEnd,
        handleTabsContainerDragStart,
        handleTabsContainerDragSnapTo,
    };
}