"use client";

import { ComponentProps, PointerEvent, useEffect, useRef } from "react";
import { reaction } from "mobx";

import { useBottomSheet } from "../bottom-sheet.context";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace BottomSheetScrollable {
    export type Props = ComponentProps<"div">;
}

export const BottomSheetScrollable = ({
    children,
    style,
    onPointerDown,
    className,
    ...props
}: BottomSheetScrollable.Props) => {
    const { controller, store } = useBottomSheet();
    const isScrollable = useRef(false);
    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = scrollerRef.current;
        if(!element) return;

        isScrollable.current = element.scrollHeight > element.clientHeight;

        if(!isScrollable.current) {
            element.style.overflowY = "hidden";
            return;
        }

        const disposer = reaction(
            () => store.settledSnapPoint,
            (index) => {
                if(scrollerRef.current) {
                    scrollerRef.current.style.overflowY = index === 0 ? "auto" : "hidden";
                }
            },
        );

        return () => disposer();
    }, []);

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if(isScrollable.current) {
            if(store.activeSnapPoint !== 0) {
                controller.dragControls.start(event);
            }
            event.stopPropagation();
        }

        onPointerDown?.(event);
    };

    return (
        <div
            ref={scrollerRef}
            style={{
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                touchAction: "pan-y",
                overscrollBehavior: "auto",
                ...style,
            }}
            onPointerDown={handlePointerDown}
            className={cx(
                styles.bottomSheet__scrollable,
                className,
            )}
            {...props}
        >
            { children }
        </div>
    );
};