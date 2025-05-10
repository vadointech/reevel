"use client";

import { Drawer as Vaul } from "vaul";
import { Button } from "@/components/shared/_redesign";

import styles from "../../button/styles.module.scss";
import cx from "classnames";

export namespace DrawerTrigger {
    export type Props = Button.Props;
}

export const DrawerTrigger = ({
    size,
    variant,
    className,
    ...props
}: DrawerTrigger.Props) => {
    return (
        <Vaul.Trigger
            className={cx(
                styles.button,
                styles[`button_size_${size}`],
                styles[`button_variant_${variant}`],
                className,
            )}
            {...props}
        />
    );
};
