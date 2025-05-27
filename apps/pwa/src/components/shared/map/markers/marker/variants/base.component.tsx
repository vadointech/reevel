import { BasePoint } from "../../../types";

import styles from "../styles.module.scss";

export namespace BasePointMarker {
    export type Props = BasePoint;
}

export const BasePointMarker = (point: BasePointMarker.Props) => {
    return (
        <>
            <span
                className={styles.marker__point}
            />
            <div className={styles.marker__content}>
            </div>
        </>
    );
};
