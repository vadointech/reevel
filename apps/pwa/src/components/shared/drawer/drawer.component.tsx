"use client";

import { useState } from "react";
import { Drawer as Vaul, DialogProps } from "vaul";
import styles from "./styles.module.scss";

export namespace Drawer {
    export type SnapPoints = "low" | "middle" | "full";

    export type Props = DialogProps & {
        overlay?: boolean;
        closeAllowed?: boolean;
        defaultPoint?: SnapPoints | false;
    };
}

const snapPointsMap: Record<Drawer.SnapPoints, string | number> = {
    low: "168px",
    middle: "348px",
    full: 1,
};

export const Drawer = ({
    overlay = true,
    defaultPoint = false,
    dismissible = false,
    children,
    snapPoints = Object.values(snapPointsMap),
    ...props
}: Drawer.Props) => {

    const defaultSnapPoint = defaultPoint ? snapPointsMap[defaultPoint] : snapPointsMap["low"];

    const [open, setOpen] = useState(!!defaultPoint);

    const [snap, setSnap] = useState<number | string | null>(defaultSnapPoint);

    return (
        <Vaul.Root
            open={open}
            onOpenChange={setOpen}
            activeSnapPoint={snap}
            setActiveSnapPoint={setSnap}
            snapPoints={snapPoints}
            dismissible={dismissible}
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