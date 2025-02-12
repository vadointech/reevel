import { ComponentProps } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Lollypop {
    export type Props = ComponentProps<"div"> & {

    };
}

export const Lollypop = ({
    className,
    ...props
}: Lollypop.Props) => {
    return (
        <div
            className={cx(
                styles.block,
                className,
            )}
            {...props}
        >
            📍
        </div>
    );
};