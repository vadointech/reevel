"use client";

import { useEffect, MouseEvent, ReactNode } from "react";

import { HTMLMotionProps, motion } from "motion/react";
import { useTabsContext } from "../tabs.context";
import {
    useTabsContentDrag,
    useTabButtons,
    useTabsContainer,
    useTabsContentContainer,
} from "../hooks";

import { Container } from "@/components/ui";
import { TabsTabButton } from "./tab-button.component";

import styles from "../styles.module.scss";
import cx from "classnames";

type TabsContentValue = {
    label: ReactNode;
    value: ReactNode;
};

export namespace TabsBody {
    export type Props = Omit<HTMLMotionProps<"div">, "children" | "content"> & {
        content: TabsContentValue[]
    };
}

export const TabsBody = ({
    content = [],
    className,
    ...props
}: TabsBody.Props) => {
    const tabs = useTabsContext();

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
        tabsContentItemsRef,
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
        if(index === tabs.store.activeTabIndex) return;

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
                    dragDirectionLock
                    dragConstraints={tabsContainerDragBounds}
                    onDragStart={handleTabsContainerDragStart}
                    onDragEnd={handleTabsContainerDragEnd}
                    className={styles.controls}
                >
                    {
                        content.map((item, index) => (
                            <TabsTabButton
                                index={index}
                                key={"tab-control-item" + index}
                                ref={(element) => {
                                    tabsRef.current[index] = element;
                                }}
                                onClick={(event) => handleSelect(event, index)}
                            >
                                { item.label }
                            </TabsTabButton>
                        ))
                    }
                    <motion.div
                        animate={tabButtonOverlayAnimate}
                        className={styles.controls__overlay}
                    />
                </motion.div>
            </Container>
            <motion.div style={{ flex: "auto", overflow: "hidden" }}>
                <motion.div
                    drag={"x"}
                    ref={tabsContentRefHandler}
                    style={{ x: tabsContentDragX }}
                    animate={tabsContentAnimate}
                    dragDirectionLock
                    dragConstraints={tabsContentDragBounds}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                    className={cx(
                        styles.tabs,
                        tabs.config.fitContent && styles.tabs_fit,
                        className,
                    )}
                    {...props}
                >
                    {
                        content.map((item, index) => (
                            <div
                                ref={(element) => {
                                    tabsContentItemsRef.current[index] = element;
                                }}
                                key={"tab-content-item" + index}
                                className={styles.content}
                            >
                                { item.value }
                            </div>
                        ))
                    }
                </motion.div>
            </motion.div>
        </>
    );
};
