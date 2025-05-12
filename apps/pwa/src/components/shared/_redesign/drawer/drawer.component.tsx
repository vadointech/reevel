"use client";

import { useMemo, useState } from "react";
import { Drawer as Vaul, DialogProps } from "vaul";
import { snapPointsConfig, SnapPointsConfig } from "./snap-points/config";

import styles from "./styles.module.scss";

export namespace Drawer {
    export type Props = DialogProps & {
        overlay?: boolean;
        staticPointKey?: SnapPointsConfig;
        defaultPointKey?: SnapPointsConfig;
    };
}

export const Drawer = ({
    overlay = true,
    children,
    staticPointKey,
    ...props
}: Drawer.Props) => {
    const [open, setOpen] = useState(false);

    const snapPoints = useMemo(() => {
        if(staticPointKey) {
            return [snapPointsConfig[staticPointKey]];
        }
        return Object.values(snapPointsConfig);
    }, [staticPointKey]);

    const closeThreshold = useMemo(() => {
        return snapPointsConfig[staticPointKey || SnapPointsConfig.Low];
    }, [staticPointKey]);

    const [activeSnapPoint, setActiveSnapPoint] = useState<string | number | null>(() => {
        if(staticPointKey) {
            return snapPointsConfig[staticPointKey];
        }
        return snapPointsConfig[SnapPointsConfig.Low];
    });

    return (
        <Vaul.Root
            open={open}
            onOpenChange={setOpen}
            closeThreshold={.5}
            snapPoints={snapPoints}
            activeSnapPoint={activeSnapPoint}
            setActiveSnapPoint={setActiveSnapPoint}
            noBodyStyles
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
