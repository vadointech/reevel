import { ComponentProps, ReactNode } from "react";

import { UISize } from "@/types/common";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Button {
    export type Size = UISize;
    export type Variant =
        "primary" |
        "secondary-muted" |
        "default" |
        "outline" |
        "accent" |
        "accent-muted" |
        "text-primary" |
        "text-accent";
    export type Props = ComponentProps<"button"> & {
        size?: Size;
        variant?: Variant;
        iconBefore?: ReactNode;
        iconAfter?: ReactNode;
        arrowAfter?: ReactNode;
    };
}

export const Button = ({
    size = "default",
    variant = "primary",
    iconBefore,
    iconAfter,
    arrowAfter,
    children,
    className,
    ...props
}: Button.Props) => {
    return (
        <button
            className={cx(
                styles.button,
                styles[`button_size_${size}`],
                styles[`button_variant_${variant}`],
                className,
            )}
            {...props}
        >
            { iconBefore }
            <span>
                { children }
            </span>
            { iconAfter }
            {
                arrowAfter ? (
                    <div className={styles["button__arrow-after"]}>
                        { arrowAfter }
                    </div>
                ) : null
            }
        </button>
    );
};
