import { ComponentProps } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Options {
    export type Props = ComponentProps<"div">;
}

export const Options = ({
    className,
    children,
    ...props
}: Options.Props) => {
    return (
        <div
            className={cx(
                styles.options,
                className,
            )}
            {...props}
        >
            { children }
        </div>
    );
};
