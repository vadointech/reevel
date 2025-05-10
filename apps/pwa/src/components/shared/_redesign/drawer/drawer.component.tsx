"use client";

import { Drawer as Vaul, DialogProps } from "vaul";
import styles from "./styles.module.scss";

export namespace Drawer {
    export type SnapPoints = "low" | "middle" | "full";

    export type Props = DialogProps & {
        overlay?: boolean;
        staticPoint?: SnapPoints | false;
        defaultPoint?: SnapPoints | false;
    };
}

export const Drawer = ({
    overlay = true,
    children,
    ...props
}: Drawer.Props) => {
    return (
        <Vaul.Root
            {...props}
        >
            {
                overlay && (
                    <Vaul.Overlay className={styles.drawer__overlay} />
                )
            }
            { children }
        </Vaul.Root>
    );
};
