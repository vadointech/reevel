"use client";

import { ComponentProps, PointerEvent } from "react";
import { useBottomSheet } from "@/components/shared/bottom-sheet/bottom-sheet.context";


import styles from "../styles.module.scss";
import cx from "classnames";

export namespace BottomSheetHandle {
    export type Props = ComponentProps<"div">;
}

export const BottomSheetHandle = ({
    className,
    onPointerDown,
    ...props
}: BottomSheetHandle.Props) => {
    const { controller } = useBottomSheet();
    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if(controller.internalConfig.handleOnly) {
            controller.dragControls.start(event);
        }
        onPointerDown?.(event);
    };
    return (
        <div
            className={cx(
                styles.bottomSheet__handle,
                className,
            )}
            onPointerDown={handlePointerDown}
            {...props}
        />
    );
};
