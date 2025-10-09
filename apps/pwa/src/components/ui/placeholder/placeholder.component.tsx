import { ComponentProps, ReactNode } from "react";

import styles from "./styles.module.scss";
import { cva, VariantProps } from "class-variance-authority";

const placeholder = cva(styles.placeholder, {
    variants: {
        size: {
            default: styles.placeholder__size_default,
            small: styles.placeholder__size_small,
        },
    },
    defaultVariants: {
        size: "default",
    },
});

export namespace Placeholder {
    export type Props = ComponentProps<"div"> & VariantProps<typeof placeholder> & {
        icon?: ReactNode;
        title?: string | ReactNode;
        description?: string | ReactNode;
    };
}

export const Placeholder = ({
    size,
    className,

    icon,
    title,
    description,
    children,

    ...props
}: Placeholder.Props) => {
    return (
        <div
            className={placeholder({ size, className })}
            {...props}
        >
            {
                icon ? (
                    <div className={styles.placeholder__icon}>
                        { icon }
                    </div>
                ) : null
            }

            {
                title ? (
                    <h3
                        className={styles.placeholder__title}
                    >
                        { title }
                    </h3>
                ) : null
            }

            {
                description ? (
                    <p
                        className={styles.placeholder__description}
                    >
                        { description }
                    </p>
                ) : null
            }

            {
                children ? (
                    <div  className={styles.placeholder__cta}>
                        { children }
                    </div>
                ) : null
            }
        </div>
    );
};
