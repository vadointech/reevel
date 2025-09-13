import { ComponentProps } from "react";
import { IconLocation } from "@/components/icons";
import { CvaUIConfig } from "@/types/common";

import styles from "./styles.module.scss";
import { cva, VariantProps } from "class-variance-authority";

const location = cva<CvaUIConfig>(styles.location, {
    variants: {
        size: {
            default: styles.location_size_default,
            small: styles.location_size_small,
            large: "",
            xsmall: "",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

export namespace LocationBadge {
    export type Props = ComponentProps<"div"> & VariantProps<typeof location>;
}

export const LocationBadge = ({
    size,
    className,
    children,
    ...props
}: LocationBadge.Props) => {
    return (
        <div
            className={location({ size, className })}
            {...props}
        >
            <IconLocation />
            <span>{ children }</span>
        </div>
    );
};
