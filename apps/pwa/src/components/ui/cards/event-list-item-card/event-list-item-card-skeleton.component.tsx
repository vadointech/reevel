
import styles from "./styles.module.scss";
import cx from "classnames";
import { AttendeeBadgeSkeleton } from "@/components/ui";

export namespace EventListItemCardSkeleton {
    export type Props = never;
}

export const EventListItemCardSkeleton = () => {
    return (
        <div
            className={styles.card}
        >
            <div
                className={cx(
                    styles.card__image,
                    styles.skeleton__image,
                )}
            >
            </div>
            <div className={styles.card__content}>
                <div className={styles.skeleton__date} />
                <div className={styles.skeleton__title} />
                <AttendeeBadgeSkeleton />
            </div>
        </div>
    );
};
