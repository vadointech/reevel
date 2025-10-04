import { ComponentProps } from "react";
import { IconCalendar } from "@/components/icons";

import styles from "./styles.module.scss";
import { cva, VariantProps } from "class-variance-authority";
import { CvaUIConfig } from "@/types/common";

const badge = cva<CvaUIConfig>(styles.badge, {
    variants: {
        size: {
            default: styles.badge__size_default,
            small: styles.badge__size_small,
            large: "",
            xsmall: "",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

export namespace DateBadge {
    export type Props = ComponentProps<"div"> & VariantProps<typeof badge>;
}

export const DateBadge = ({
    children,
    className,
    size,
    ...props
}: DateBadge.Props) => {
    return (
        <div
            className={badge({ size, className})}
            {...props}
        >
            <IconCalendar />
            { children }
        </div>
    );
};