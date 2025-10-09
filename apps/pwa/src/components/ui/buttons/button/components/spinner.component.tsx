import styles from "../styles/spinner.module.scss";
import buttonStyles from "../styles/button.module.scss";
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
                buttonStyles["button__icon-before"],
                loading && styles.wrapper_visible,
            )}
        >
            <span className={styles.spinner} />
        </span>
    );
};