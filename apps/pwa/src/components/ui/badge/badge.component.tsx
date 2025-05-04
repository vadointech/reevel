import { ComponentProps, ReactNode } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import { Typography } from "@/components/ui";

export namespace Badge {
    export type Variant = "default" | "primary" | "ghost" | "date" | "fire";
    export type Size = "default" | "small";
    export type Props = ComponentProps<"div"> & {
        variant?: Variant;
        size?: Size;
        icon?: ReactNode;
    };
}

export const Badge = ({
    variant = "default",
    size = "default",
    icon,
    className,
    children,
    ...props
}: Badge.Props) => {
    return (
        <div
            className={cx(
                styles.badge,
                styles[`badge__variant_${variant}`],
                styles[`badge__size_${size}`],
                className,
            )}
            {...props}
        >
            { icon ? icon : null }
            <Typography.span size={"xs"}>
                { children }
            </Typography.span>
        </div>
    );
};
