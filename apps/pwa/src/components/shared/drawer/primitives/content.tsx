"use client";

import { ComponentProps } from "react";
import { Drawer as Vaul } from "vaul";

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
        <Vaul.Portal>
            <Vaul.Content
                data-testid="content"
                className={styles.drawer__body}
            >
                <Vaul.Title />

                {
                    showIcon && <div className={styles.drawer__icon} />
                }

                <div
                    className={cx(
                        styles.drawer__content,
                        className,
                    )}
                    {...props}
                >
                    { children }
                </div>

            </Vaul.Content>
        </Vaul.Portal>
    );
};