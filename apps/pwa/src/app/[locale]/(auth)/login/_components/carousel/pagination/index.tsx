import { ComponentProps } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

namespace LoginCarouselPagination {
    export type Props = ComponentProps<"div">
}

const LoginCarouselPagination = ({ className, ...props }: LoginCarouselPagination.Props) => {
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

export { LoginCarouselPagination };
