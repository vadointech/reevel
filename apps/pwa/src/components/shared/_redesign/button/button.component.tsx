import { ComponentProps, HTMLAttributeAnchorTarget, ReactNode } from "react";

import { UISize } from "@/types/common";

import styles from "./styles.module.scss";
import cx from "classnames";
import { Link } from "@/i18n/routing";

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
    target,
    ...props
}: Button.Props) => {
    const Component = () => {
        return (
            <button
                className={cx(
                    styles.button,
                    styles[`button_size_${size}`],
                    styles[`button_variant_${variant}`],
                    className,
                )}
                type={type}
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

    if(href) {
        return (
            <Link href={href} target={target}>
                <Component />
            </Link>
        );
    }

    return <Component />;
};
