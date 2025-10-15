import { UISize } from "@/types/common";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace AttendeeBadgeSkeleton {
    export type Props = {
        size?: UISize;
        count?: number;
    };
}

export const AttendeeBadgeSkeleton = ({
    size = "default",
    count = 1,
}: AttendeeBadgeSkeleton.Props) => {
    return (
        <div
            className={cx(
                styles.skeleton,
                styles[`section__size_${size}`],
            )}
        >
            {
                [...Array(count).keys()].map((item) => (
                    <div key={`avatar-skeleton-${item}`} className={styles.skeleton__avatar} />
                ))
            }
            <div className={styles.skeleton__more} />
        </div>
    );
};
