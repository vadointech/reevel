import { ComponentProps, ReactNode } from "react";

import styles from "./styles.module.scss";
import { cva, VariantProps } from "class-variance-authority";

const interestButton = cva(styles.button, {
    variants: {
        layout: {
            default: styles.button_layout_default,
            icon: styles.button_layout_icon,
        },
        variant: {
            default: styles.button_variant_default,
            text: styles.button_variant_text,
            primary: styles.button_variant_primary,
            accent: styles.button_variant_accesnt,
            outline: styles.button_variant_outline,
            background: styles.button_variant_background,
        },
    },
    defaultVariants: {
        layout: "default",
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
    layout,
    icon,
    className,
    children,
    ...props
}: InterestButton.Props) => {
    return (
        <div
            className={interestButton({ variant, layout, className })}
            {...props}
        >
            { icon }

            {
                layout !== "icon" && (
                    <span>
                        {children}
                    </span>
                )
            }
        </div>
    );
};
