import { ComponentProps } from "react";

import styles from "../styles/carousel-pagination.module.scss";
import cx from "classnames";

export namespace AuthCarouselPagination {
    export type Props = ComponentProps<"div">;
}

export const AuthCarouselPagination = ({
    className,
    ...props
}: AuthCarouselPagination.Props) => {
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