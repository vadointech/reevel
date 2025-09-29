import styles from "../styles/spinner.module.scss";
import cx from "classnames";

export namespace Spinner {
    export type Props = {
        loading?: boolean;
    };
}

export const Spinner = ({
    loading = false,
}: Spinner.Props) => {
    return (
        <span
            className={cx(
                styles.wrapper,
                loading && styles.wrapper_visible,
            )}
        >
            <span className={styles.spinner} />
        </span>
    );
};