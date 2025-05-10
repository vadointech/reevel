"use client";

import { useEffect, MouseEvent } from "react";

import { HTMLMotionProps, motion } from "motion/react";
import {
    useTabsContentDrag,
    useTabButtons,
    useTabsContainer,
    useTabsContentContainer,
} from "../hooks";
import { useTabsStore } from "../tabs.store";

import { Container } from "@/components/ui";
import { TabsTabButton } from "./tab-button.component";

import styles from "../styles.module.scss";

export namespace TabsBody {
    export type Props = HTMLMotionProps<"div"> & {
        items: string[]
    };
}

export const TabsBody = ({
    items,
    ...props
}: TabsBody.Props) => {
    const tabsStore = useTabsStore();

    const {
        tabsContainerDragX,
        isTabsContainerDrag,
        tabsContainerAnimate,
        tabsContainerDragBounds,
        tabsContainerRefHandler,
        handleTabsContainerDragEnd,
        handleTabsContainerDragStart,
        handleTabsContainerDragSnapTo,
    } = useTabsContainer();

    const {
        tabsContentParams,
        tabsContentRefHandler,
        tabsContentDragBounds,
        tabsContentSnapPoints,
    } = useTabsContentContainer();

    const {
        tabsRef,
        tabButtonOverlayAnimate,
        setStartTabRef,
        setTargetTabRef,
        animateTabsButtonOverlay,
    } = useTabButtons();

    const {
        tabsContentDragX,
        tabsContentAnimate,
        tabsContentDragXProgress,

        scrollTo,
        handleDrag,
        handleDragEnd,
        handleDragStart,
    } = useTabsContentDrag(
        tabsContentParams,
        tabsContentSnapPoints,
        {
            onActiveChange: (index) => {
                setTargetTabRef(index);
            },
            onDragStart: (index, direction) => {
                setStartTabRef(index);
                setTargetTabRef(index + direction);
            },
            onDragEnd: (index, direction) => {
                const target = tabsRef.current[index];
                if(!target) return;
                handleTabsContainerDragSnapTo(target, direction);
            },
        },
    );

    useEffect(() => {
        const unsubscribe = tabsContentDragXProgress.on("change", animateTabsButtonOverlay);
        return () => unsubscribe();
    }, [tabsContentDragXProgress]);

    const handleSelect = (event: MouseEvent<HTMLButtonElement>, index: number) => {
        if(isTabsContainerDrag.current) return;
        if(index === tabsStore.activeTabIndex) return;

        const target = event.target;
        if(target instanceof HTMLButtonElement) {
            scrollTo(index);
        }
    };

    return (
        <>
            <Container>
                <motion.div
                    drag={"x"}
                    style={{ x: tabsContainerDragX }}
                    ref={tabsContainerRefHandler}
                    animate={tabsContainerAnimate}
                    dragConstraints={tabsContainerDragBounds}
                    onDragStart={handleTabsContainerDragStart}
                    onDragEnd={handleTabsContainerDragEnd}
                    className={styles.controls}
                >
                    {
                        items.map((item, index) => (
                            <TabsTabButton
                                index={index}
                                key={"tab-control-item" + index}
                                ref={(element) => {
                                    tabsRef.current[index] = element;
                                }}
                                onClick={(event) => handleSelect(event, index)}
                            >
                                { item }
                            </TabsTabButton>
                        ))
                    }
                    <motion.div
                        animate={tabButtonOverlayAnimate}
                        initial={{ x: 0, width: 103 }}
                        className={styles.controls__overlay}
                    />
                </motion.div>
            </Container>
            <motion.div
                drag={"x"}
                ref={tabsContentRefHandler}
                style={{ x: tabsContentDragX }}
                animate={tabsContentAnimate}
                dragConstraints={tabsContentDragBounds}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                className={styles.tabs}
                {...props}
            />
        </>
    );
};
