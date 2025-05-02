"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { Drawer as Vaul, DialogProps } from "vaul";
import styles from "./styles.module.scss";
import { getSnapPointName, snapPointsMap } from "./plugins";

export namespace Drawer {
    export type SnapPoints = "low" | "middle" | "full";

    export type Props = DialogProps & {
        overlay?: boolean;
        staticPoint?: SnapPoints | false;
        defaultPoint?: SnapPoints | false;
    };
}

export const DrawerContext = createContext<{
    activeSnapPoint: Drawer.SnapPoints | null;
    setActiveSnapPoint: (point: string | number | null) => void;
}>({
    activeSnapPoint: null,
    setActiveSnapPoint: () => { },
});

export const useDrawer = () => useContext(DrawerContext);

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
        if (staticPoint) return snapPointsMap[staticPoint];
        if (defaultPoint) return snapPointsMap[defaultPoint];
        return snapPointsMap["low"];
    }, [staticPoint, defaultPoint, snapPointsMap]);

    const [open, setOpen] = useState(!!defaultPoint || !!staticPoint);
    const [snapPointValue, setSnapPointValue] = useState<number | string | null>(defaultSnapPoint);
    const activeSnapPoint = getSnapPointName(snapPointValue);

    return (
        <DrawerContext.Provider value={{ activeSnapPoint, setActiveSnapPoint: setSnapPointValue }}>
            <Vaul.Root
                open={open}
                onOpenChange={setOpen}
                activeSnapPoint={snapPointValue}
                setActiveSnapPoint={setSnapPointValue}
                snapPoints={staticPoint ? [snapPointsMap[staticPoint]] : snapPoints}
                dismissible={dismissible}
                {...props}

            >
                {
                    overlay && (
                        <Vaul.Overlay className={styles.drawer__overlay} />
                    )
                }

                {children}
            </Vaul.Root>
        </DrawerContext.Provider>
    );
};
