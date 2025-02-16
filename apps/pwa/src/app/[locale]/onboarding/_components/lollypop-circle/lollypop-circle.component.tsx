import { ComponentProps } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace DotIcon {
    export type Props = ComponentProps<"div"> & {

    };
}

export const DotIcon = ({
    className,
    ...props
}: DotIcon.Props) => {
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