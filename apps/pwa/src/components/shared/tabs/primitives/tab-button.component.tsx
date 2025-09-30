"use client";

import { ComponentProps, forwardRef } from "react";
import { observer } from "mobx-react-lite";
import { useTabsContext } from "../tabs.context";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace TabsTabButton {
    export type Props = ComponentProps<"button"> & {
        index: number;
    };
}

export const TabsTabButton = observer(forwardRef<HTMLButtonElement, TabsTabButton.Props>(({
    index,
    ...props
}, ref) => {
    const tabs = useTabsContext();
    return (
        <button
            ref={ref}
            className={cx(
                styles.controls__item,
                index === tabs.store.activeTabIndex && styles.controls__item_active,
            )}
            {...props}
        />
    );
}));
