import Image from "next/image";
import { EventPoint } from "../../../types";

import styles from "../styles/event-marker.module.scss";

export namespace BasePointMarker {
    export type Props = EventPoint;
}

export const BasePointMarker = (point: BasePointMarker.Props) => {
    return (
        <>
            <span
                className={styles.marker__point}
                style={{ backgroundColor: point.primaryColor }}
            />
            <div className={styles.marker__content}>
                <div
                    className={styles.marker__image}
                >
                    <Image fill alt={"poster"} src={point.imageUrl} />
                </div>
            </div>
            <label
                className={styles.marker__label}
                style={{
                    color: point.primaryColor,
                }}
            >
                { point.label }
            </label>
        </>
    );
};
