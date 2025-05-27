import { getIncludedTypeMarker } from "@/features/location/picker/utils/get-marker-icon";
import { IconPoint } from "../../../types";

import styles from "../styles.module.scss";
import { memo } from "react";

export namespace IconPointMarker {
    export type Props = IconPoint;
}

export const IconPointMarker = memo((point: IconPointMarker.Props) => {
    const icon = getIncludedTypeMarker(point);

    return (
        <>
            <span
                className={styles.marker__point}
                style={{ backgroundColor: icon.primaryColor }}
            />
            <div className={styles.marker__content}>
                <div
                    className={styles.marker__icon}
                    style={{
                        background: `linear-gradient(
                            to bottom,
                            ${icon.secondaryColor} 0%,
                            ${icon.primaryColor} 100%
                        )`,
                    }}
                >
                    { icon.icon }
                </div>
            </div>
            <label
                className={styles.marker__label}
                style={{
                    color: icon.primaryColor,
                }}
            >
                { point.label }
            </label>
        </>
    );
});