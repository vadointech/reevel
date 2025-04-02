import { Children, ComponentProps, ReactNode } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

export type Size = "default" | "small"

export namespace Options {
    export type Props = ComponentProps<"div"> & {
        children: ReactNode;
    };
}

export const Options = ({

    className,
    children,
    ...props
}: Options.Props) => {
    return (
        <div className={styles.options} {...props}>
            {children}
        </div>
    );
}
