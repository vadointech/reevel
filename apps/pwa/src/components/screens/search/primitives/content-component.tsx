import { ComponentProps } from "react";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace SearchScreenContent {
    export type Props = ComponentProps<"div">;
}

export const SearchScreenContent = ({
    className,
    ...props
}: SearchScreenContent.Props) => {
    return (
        <div className={cx(styles.search__content, className)} {...props} />
    );
};
