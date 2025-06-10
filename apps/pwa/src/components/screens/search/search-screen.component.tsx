import { ComponentProps } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace SearchScreen {
    export type Props = ComponentProps<"div">;
}

export const SearchScreen = ({
    className,
    ...props
}: SearchScreen.Props) => {
    return (
        <div className={cx(styles.search, className)} {...props} />
    );
};