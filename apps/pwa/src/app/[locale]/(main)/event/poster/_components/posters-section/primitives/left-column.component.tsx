"use client";

import { ComponentProps, ReactNode } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

export namespace LeftColumn {
    export type Props = ComponentProps<"div"> & {
        children: ReactNode
    };
}

export const LeftColumn = ({ children, className, ...props }: LeftColumn.Props) => {
    return (

        <div className={cx(styles.column, className)} {...props}>
            {children}
        </div >
    );
};
