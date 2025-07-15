import { ComponentProps } from "react";

import marker from "../styles.module.scss";
import styles from "./styles.module.scss";
import cx from "classnames";

export namespace ClusterMarker {
    export type Props = ComponentProps<"div"> & {
        size: number;
        active?: boolean;
    };
}

export const ClusterMarker = ({
    className,
    style,
    size,
    children,
    active,
    ...props
}: ClusterMarker.Props) => {
    return (
        <div
            className={cx(
                styles.cluster,
                marker.marker,
                active ? marker.marker_active : marker.marker_unactive,
                className,
            )}
            style={{
                ...style,
                width: size,
                height: size,
            }}
            {...props}
        >
            <span
                className={styles.cluster__text}
                style={{
                    lineHeight: 1,
                    fontSize: Math.max(size / 2.4, 16),
                }}
            >
                { children }
            </span>
        </div>
    );
};
