import { type ComponentProps, ReactNode } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Button {
    export type Props = ComponentProps<"button"> & {
        variant?: "default" | "primary" | "text";
        size?: "large" | "small";
        iconBefore?: ReactNode;
        iconAfter?: ReactNode;
        iconColor?: "default" | "initial"
    };
}

export const Button = ({
    variant = "default",
    size = "large",
    className,
    children,
    iconBefore,
    iconAfter,
    iconColor = "default",
    ...props
}: Button.Props) => {
    return (
        <button
            className={cx(
                styles.button,
                styles[`button__size_${size}`],
                styles[`button__variant_${variant}`],
                iconColor === "default" && styles[`button__icon_${variant}`],
                className,
            )}
            {...props}
        >
            { iconBefore }
            <span>{ children }</span>
            { iconAfter }
        </button>
    );
};