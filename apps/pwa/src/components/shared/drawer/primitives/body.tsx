"use client";

import { ComponentProps } from "react";
import { Drawer as Vaul } from "vaul";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace DrawerBody {
    export type Props = ComponentProps<"div">;
}

export const DrawerBody = ({
    children,
    className,
    ...props
}: DrawerBody.Props) => {
    return (
        <Vaul.Portal>
            <Vaul.Content
                data-testid="content"
                className={cx(
                    styles.drawer__body,
                    className,
                )}
                {...props}
            >
                <Vaul.Title />

                { children }

            </Vaul.Content>
        </Vaul.Portal>
    );
};