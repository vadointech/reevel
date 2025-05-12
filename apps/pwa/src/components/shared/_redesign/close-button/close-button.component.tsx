import { ComponentProps } from "react";

import styles from "./styles.module.scss";
import { cva, VariantProps } from "class-variance-authority";
import { IconClose } from "@/components/icons";

const closeButton = cva(styles.close, {
    variants: {
        variant: {
            default: styles.close_variant_default,
        },
        size: {
            default: styles.close_size_default,
            small: styles.close_size_small,
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

export namespace CloseButton {
    export type Props = ComponentProps<"button"> & VariantProps<typeof closeButton>;
}

export const CloseButton = ({
    size,
    className,
    ...props
}: CloseButton.Props) => {
    return (
        <button
            className={closeButton({ size, className })}
            {...props}
        >
            <IconClose />
        </button>
    );
};
