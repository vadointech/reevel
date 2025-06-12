import { ComponentProps } from "react";

import styles from "../styles.module.scss";
import { cva, VariantProps } from "class-variance-authority";

const fileGrid = cva(styles.upload__grid, {
    variants: {
        variant: {
            vertical: styles.upload__grid_vertical,
            horizontal: styles.upload__grid_horizontal,
            rounded: styles.upload__grid_rounded,
        },
    },
    defaultVariants: {
        variant: "vertical",
    },
});

export namespace UploadFileGrid {
    export type Variants = VariantProps<typeof fileGrid>;
    export type Props = ComponentProps<"div"> & Variants;
}

export const UploadFileGrid = ({
    variant,
    className,
    ...props
}: UploadFileGrid.Props) => {

    return (
        <div
            className={fileGrid({ variant, className })}
            {...props}
        />
    );
};
