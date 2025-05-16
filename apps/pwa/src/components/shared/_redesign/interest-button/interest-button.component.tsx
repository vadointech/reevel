import { ComponentProps, ReactNode } from "react";

import styles from "./styles.module.scss";
import { cva, VariantProps } from "class-variance-authority";

const interestButton = cva(styles.button, {
    variants: {
        variant: {
            default: styles.button_default,
            text: styles.button_text,
            primary: styles.button_primary,
            outline: styles.button_outline,
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export namespace InterestButton {

    export type Variant = "default" | "text" | "primary" | "outline";

    export type Props = ComponentProps<"div"> & VariantProps<typeof interestButton> & {
        icon?: string | ReactNode
    };
}

export const InterestButton = ({
    variant,
    icon,
    className,
    children,
    ...props
}: InterestButton.Props) => {
    return (
        <div
            className={interestButton({ variant, className })}
            {...props}
        >
            {
                icon ? (
                    <div>
                        {icon}
                    </div>
                ) : null
            }
            <span>
                {children}
            </span>
        </div>
    );
};
