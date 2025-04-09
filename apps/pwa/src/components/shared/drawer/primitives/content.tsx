"use client";

import { ComponentProps } from "react";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace DrawerContent {
    export type Props = ComponentProps<"div"> & {
        showIcon?: boolean;
    };
}

export const DrawerContent = ({
    children,
    className,
    showIcon = true,
    ...props
}: DrawerContent.Props) => {
    return (
        <div
            className={cx(
                styles.drawer__content,
                className,
            )}
            {...props}
        >
            {
                showIcon && (
                    <div className={styles.drawer__icon} />
                )
            }

            {children}
        </div>
    );
};