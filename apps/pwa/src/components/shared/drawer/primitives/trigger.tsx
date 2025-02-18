"use client";

import { ComponentProps } from "react";
import { Drawer as Vaul } from "vaul";
import styles from "../styles.module.scss";
import cx from "classnames";

export namespace DrawerTrigger {
    export type Props = ComponentProps<"button">;
}

export const DrawerTrigger = ({ className, ...props }: DrawerTrigger.Props) => {
    return (
        <Vaul.Trigger
            className={cx(
                styles.drawer__trigger,
                className,
            )}
            {...props}
        />
    );
};
