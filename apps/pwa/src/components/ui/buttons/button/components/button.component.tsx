import { ComponentProps, HTMLAttributeAnchorTarget, ReactNode } from "react";
import { Link } from "@/i18n/routing";
import { Spinner } from "./spinner.component";

import { UISize } from "@/types/common";

import styles from "../styles/button.module.scss";
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
        loading?: boolean;
        href?: string;
        target?: HTMLAttributeAnchorTarget
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
    type = "button",
    href,
    loading,
    target,
    ...props
}: Button.Props) => {
    const buttonContent = (
        <>
            <Spinner loading={loading} />
            {
                (iconBefore && !loading) ? (
                    <div className={styles["button__icon-before"]}>
                        { iconBefore }
                    </div>
                ) : null
            }
            <span>
                { children }
            </span>

            {
                iconAfter ? (
                    <div className={styles["button__icon-after"]}>
                        { iconAfter }
                    </div>
                ) : null
            }

            {
                arrowAfter ? (
                    <div className={cx(styles["button__icon-after"], styles["button__arrow-after"])}>
                        { arrowAfter }
                    </div>
                ) : null
            }
        </>
    );

    const buttonClasses = cx(
        styles.button,
        styles[`button_size_${size}`],
        styles[`button_variant_${variant}`],
        className,
    );

    if (href) {
        return (
            <Link
                href={href}
                target={target}
                className={buttonClasses}
                {...props as Omit<ComponentProps<"a">, "popover">}
            >
                { buttonContent }
            </Link>
        );
    }

    return (
        <button
            className={buttonClasses}
            type={type}
            {...props}
        >
            { buttonContent }
        </button>
    );
};
