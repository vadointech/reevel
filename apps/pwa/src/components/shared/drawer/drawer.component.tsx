"use client";

import { ReactNode, useState } from "react";
import { Drawer as Vaul } from "vaul";
import styles from "./styles.module.scss";

export namespace Drawer {
    export type SnapPoints = "low" | "middle" | "full";

    export type Props = {
        overlay?: boolean;
        defaultPoint?: SnapPoints | false;
        children: ReactNode;
    };
}

const snapPoints: Record<Drawer.SnapPoints, string | number> = {
    low: "168px",
    middle: "348px",
    full: 1,
};

export const Drawer = ({
    overlay = true,
    defaultPoint = false,
    children,
}: Drawer.Props) => {

    const defaultSnapPoint = defaultPoint ? snapPoints[defaultPoint] : snapPoints["low"];

    const [open, setOpen] = useState(!!defaultPoint);

    const [snap, setSnap] = useState<number | string | null>(defaultSnapPoint);

    return (
        <Vaul.Root
            open={open}
            onOpenChange={setOpen}
            activeSnapPoint={snap}
            setActiveSnapPoint={setSnap}
            snapPoints={Object.values(snapPoints)}
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