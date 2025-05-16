import { useCallback, useRef, useState } from "react";
import { BoundingBox } from "motion/react";

import { TabsContentParams } from "../types";

export function useTabsContentContainer() {
    const [tabsContentDragBounds, setTabsContentDragBounds] = useState<Partial<BoundingBox>>();

    const tabsContentSnapPoints = useRef<number[]>([]);

    const tabsContentRef = useRef<HTMLDivElement>(null);
    const tabsContentParams = useRef<TabsContentParams>({ scrollWidth: 0, clientWidth: 0 });
    const tabsContentRefHandler = useCallback((element: HTMLDivElement | null) => {
        if(!element) return;
        tabsContentRef.current = element;

        tabsContentSnapPoints.current = Array.from({ length: element.children.length })
            .map((_, index) =>
                element.clientWidth * index,
            );

        const { clientWidth, scrollWidth } = element;

        tabsContentParams.current = {
            clientWidth,
            scrollWidth: -scrollWidth,
        };

        setTabsContentDragBounds({
            left: clientWidth - scrollWidth,
            right: 0,
        });
    }, []);

    return {
        tabsContentRef,
        tabsContentParams,
        tabsContentRefHandler,

        tabsContentDragBounds,
        tabsContentSnapPoints,
    };
}