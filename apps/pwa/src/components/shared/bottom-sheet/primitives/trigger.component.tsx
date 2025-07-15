"use client";

import { ComponentProps } from "react";
import { useBottomSheet } from "@/components/shared/bottom-sheet/bottom-sheet.context";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace BottomSheetTrigger {
    export type Props = ComponentProps<"div">;
}

export const BottomSheetTrigger = ({ className, ...props }: BottomSheetTrigger.Props) => {
    const { store } = useBottomSheet();

    return (
        <div
            className={cx(
                styles.bottomSheet__triger,
                className,
            )}
            onClick={() => store.setOpen(true)}
            {...props}
        />
    );
};
