import { type ComponentProps, ReactNode } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Button {
  export type Props = ComponentProps<"button"> & {
    variant?: "default" | "primary" | "text";
    size?: "large" | "small";
    iconBefore?: ReactNode;
    iconAfter?: ReactNode;
  }
}

export const Button = ({
    variant = "default",
    size = "large",
    className,
    children,
    iconBefore,
    iconAfter,
    ...props
}: Button.Props) => {
    return (
        <button
            className={cx(
                styles.button,
                styles[`button__size_${size}`],
                styles[`button__variant_${variant}`],
                className
            )}
            {...props}
        >
            { iconBefore }
            { children }
            { iconAfter }
        </button>
    );
};