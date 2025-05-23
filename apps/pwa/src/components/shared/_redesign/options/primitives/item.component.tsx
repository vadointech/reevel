import { ComponentProps, ReactNode } from "react";

import { IconArrowRight } from "@/components/icons";

import styles from "../styles.module.scss";
import { cx, cva, VariantProps } from "class-variance-authority";

const listItem = cva(styles.listItem, {
    variants: {
        weight: {
            default: styles.listItem_weight_default,
            bold: styles.listItem_weight_bold,
        },
        variant: {
            avatar: styles.listItem_variant_avatar,
            warn: styles.listItem_variant_warn,
        },
        size: {
            default: styles.listItem_size_default,
            small: styles.listItem_size_small,
        },
        disabled: {
            true: styles.listItem_disabled,
        }
    },
    defaultVariants: {
        weight: "default",
        size: "default",
        disabled: false,
    },
});

export namespace OptionsListItem {
    export type Props = Omit<ComponentProps<"li">, "children"> & VariantProps<typeof listItem> & {
        label: string | ReactNode;
        description?: string | ReactNode;
        contentLeft?: string | ReactNode;
        contentRight?: ReactNode;
        iconType?: "filled" | "outlined";
        disabled?: boolean;
    };
}

export const OptionsListItem = ({
    weight,
    variant,
    size,
    contentLeft,
    contentRight = <IconArrowRight />,
    label,
    description,
    iconType = "filled",
    disabled = false,
    className,
    ...props
}: OptionsListItem.Props) => {
    return (
        <li
            className={listItem({ weight, variant, size, disabled, className })}
            {...props}
        >
            {
                contentLeft && (
                    <div
                        className={cx(
                            styles.listItem__left,
                            styles[`listItem__left_icon_${iconType}`],
                        )}
                    >
                        {contentLeft}
                    </div>
                )
            }
            <div className={styles.listItem__content}>
                <div className={styles.listItem__title}>{label}</div>
                {
                    description && (
                        <div className={styles.listItem__description}>{description}</div>
                    )
                }
            </div>
            {
                contentRight && (
                    <div className={styles.listItem__right}>
                        {contentRight}
                    </div>
                )
            }
        </li>
    );
};
