import styles from "./styles.module.scss";

export namespace InterestButtonSkeleton {
    export type Props = never;
}

export const InterestButtonSkeleton = () => {
    return (
        <div className={styles.skeleton} />
    );
};
