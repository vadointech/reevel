"use client";

import { useMemo, useState } from "react";
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

const snapPointsMap: Record<Drawer.SnapPoints, string | number> = {
    low: "168px",
    middle: "348px",
    full: 1,
};

export const Drawer = ({
    overlay = true,
    staticPoint = false,
    defaultPoint = false,
    dismissible = false,
    children,
    snapPoints = Object.values(snapPointsMap),
    ...props
}: Drawer.Props) => {

    const defaultSnapPoint = useMemo(() => {
        if(staticPoint) return snapPointsMap[staticPoint];
        if(defaultPoint) return snapPointsMap[defaultPoint];
        return snapPointsMap["low"];
    }, [staticPoint, defaultPoint, snapPointsMap]);

    const [open, setOpen] = useState(!!defaultPoint || !!staticPoint);

    const [snap, setSnap] = useState<number | string | null>(defaultSnapPoint);

    return (
        <Vaul.Root
            open={open}
            onOpenChange={setOpen}
            activeSnapPoint={snap}
            setActiveSnapPoint={setSnap}
            snapPoints={staticPoint ? [snapPointsMap[staticPoint]] : snapPoints}
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