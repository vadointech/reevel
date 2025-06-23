import { ComponentProps } from "react";
import { BasePoint, IconPoint, isIconPoint } from "../../types";
import { IconPointMarker } from "./variants/icon.component";
import { BasePointMarker } from "./variants/base.component";

import styles from "./styles.module.scss";
import marker from "../styles.module.scss";
import cx from "classnames";

export namespace MapMarker {
    export type Props = ComponentProps<"div"> & {
        point: BasePoint | IconPoint;
        selected?: boolean;
        active?: boolean;
    };
}

export const MapMarker = ({
    point,
    selected = false,
    active = false,
    className,
    ...props
}: MapMarker.Props) => {

    const getContent = () => {
        if(isIconPoint(point)) return <IconPointMarker {...point} />;
        return <BasePointMarker />;
    };

    return (
        <div
            className={cx(
                styles.marker,
                marker.marker,
                marker.marker_enter,
                selected && marker.marker_selected,
                active ? marker.marker_active : marker.marker_unactive,
                className,
            )}
            {...props}
        >
            { getContent() }
        </div>
    );
};