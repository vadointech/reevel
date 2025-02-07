
import cx from "classnames";
import styles from "./styles.module.scss";

namespace Dots {
    export type Props = React.ComponentProps<"div"> & {
    };
}

const Dots = ({ className, ...props }: Dots.Props) => {
    return (
        <div
            className={cx(
                styles.dots,
                className,
            )}
            {...props}
        >
            <div className={styles.dot__body}></div>
            <div className={styles.dot__bold}></div>
            <div className={styles.dot__body}></div>
            <div className={styles.dot__body}></div>
        </div>
    );
};

export { Dots };
