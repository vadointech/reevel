import { type ComponentProps, ReactNode } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";
import { Link } from "@/i18n/routing";

export namespace Button {
    export type Props = ComponentProps<"button"> & {
        variant?: "default" | "primary" | "text";
        size?: "large" | "small";
        iconBefore?: ReactNode;
        iconAfter?: ReactNode;
        iconColor?: "default" | "initial";
        href?: string;
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
    href,
    ...props
}: Button.Props) => {

    const ButtonComponent = () => {
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
                {iconBefore}
                <span>{children}</span>
                {iconAfter}
            </button>
        );
    };

    if (href) {
        return (
            <Link href={href}>
                <ButtonComponent />
            </Link>
        );
    }

    return <ButtonComponent />;
};