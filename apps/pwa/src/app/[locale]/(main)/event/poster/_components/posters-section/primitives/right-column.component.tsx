"use client";

import { ComponentProps, ReactNode } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

export namespace RightColumn {
    export type Props = ComponentProps<"div"> & {
        children: ReactNode

    };
}

export const RightColumn = ({ children, className, ...props }: RightColumn.Props) => {
    return (

        <div className={cx(styles.column, className)} {...props}>
            {children}
        </div >
    );
};
