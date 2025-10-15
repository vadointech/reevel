import styles from "./styles.module.scss";
import cx from "classnames";

export namespace CollectionCardSkeleton {
    export type Props = never;
}

export const CollectionCardSkeleton = () => {
    return (
        <div
            className={cx(
                styles.card,
                styles.skeleton,
            )}
        >
            <div className={styles.card__info}>
                <div className={styles.skeleton__title} />
                <div className={styles.skeleton__location} />
            </div>

            <div className={styles.skeleton__detailed} />
        </div>
    );
};
