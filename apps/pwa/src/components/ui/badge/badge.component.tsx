import { ComponentProps, ReactNode } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import { IconWorld } from "@/components/icons/world";

export type Variant = 'default' | 'primary' | 'ghost';
export type Type = 'Private' | 'Public'


export namespace Badge {
    export type Props = ComponentProps<"div"> & {
        variant?: Variant;
        type: Type;
        icon?: ReactNode;
    };
}

export const Badge = ({
    variant = 'default',
    type,
    icon = <IconWorld />,
    children,
    className,
    ...props
}: Badge.Props) => {
    return (
        <div className={cx(
            styles.badge,
            styles[`badge__variant_${variant}`],
            className
        )}
            {...props}
        >
            {icon && <IconWorld />}

            <p>{type}</p>
        </div>
    )
}
