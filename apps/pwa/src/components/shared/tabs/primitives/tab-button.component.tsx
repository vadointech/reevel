"use client";

import { ComponentProps, forwardRef } from "react";
import { observer } from "mobx-react-lite";

import { useTabsStore } from "../tabs.store";

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
    const tabStore = useTabsStore();
    return (
        <button
            ref={ref}
            className={cx(
                styles.controls__item,
                index === tabStore.activeTabIndex && styles.controls__item_active,
            )}
            {...props}
        />
    );
}));
