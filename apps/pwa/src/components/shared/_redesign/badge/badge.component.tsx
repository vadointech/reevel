import { ComponentProps, ReactNode } from "react";

import styles from "./styles.module.scss";
import { cva, VariantProps } from "class-variance-authority";

const badge = cva(styles.badge, {
    variants: {
        variant: {
            default: styles.badge_variant_default,
            ghost: styles.badge_variant_ghost,
        },
        size: {
            default: styles.badge_size_default,
            small: styles.badge_size_small,
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

export namespace Badge {
    export type Props = ComponentProps<"div"> & VariantProps<typeof badge> & {
        iconBefore?: ReactNode;
    };
}

export const Badge = ({
    size,
    variant,
    iconBefore,
    className,
    children,
    ...props
}: Badge.Props) => {
    return (
        <div
            className={badge({ size, variant, className })}
            {...props}
        >
            { iconBefore }
            <span>{ children }</span>
        </div>
    );
};
