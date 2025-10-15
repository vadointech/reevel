import { UISize } from "@/types/common";
import { AttendeeBadgeSkeleton } from "@/components/ui";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace EventCardSkeleton {
    export type Props = {
        size?: UISize;
        displayMode?: "date" | "location"
    };
}

export const EventCardSkeleton = ({
    size = "default",
}: EventCardSkeleton.Props) => {
    return (
        <div
            className={cx(
                styles.card,
                styles[`card_size_${size}`],
                styles.skeleton,
            )}
        >
            <div
                className={cx(
                    styles.card__section,
                    styles[`card__section_size_${size}`],
                )}
            >
                <AttendeeBadgeSkeleton count={0} />
            </div>

            <div
                className={cx(
                    styles.card__section,
                    styles[`card__section_size_${size}`],
                )}
            >
                <div className={styles.skeleton__location}/>
                <h3
                    className={cx(
                        styles.skeleton__title,
                    )}
                >
                </h3>
                <AttendeeBadgeSkeleton />
            </div>
        </div>
    );
};
