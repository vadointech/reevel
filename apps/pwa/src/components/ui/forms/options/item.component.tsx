import { ComponentProps, ReactNode } from "react";

import { IconArrowRight } from "@/components/icons";

import styles from "./styles.module.scss";
import { cva, VariantProps } from "class-variance-authority";
import { Link } from "@/i18n/routing";
import { OptionsListItemLeft, OptionsListItemContent, OptionsListItemRight } from "./primitives";

export const listItem = cva(styles.listItem, {
    variants: {
        weight: {
            default: styles.listItem_weight_default,
            bold: styles.listItem_weight_bold,
        },
        variant: {
            avatar: styles.listItem_variant_avatar,
        },
        size: {
            default: styles.listItem_size_default,
            small: styles.listItem_size_small,
        },
    },
    defaultVariants: {
        weight: "default",
        size: "default",
    },
});

export namespace OptionsListItem {
    export type Props = Omit<ComponentProps<"li">, "children"> & VariantProps<typeof listItem> & {
        label: string | ReactNode;
        description?: string | ReactNode;
        status?: string | ReactNode;
        relativeTime?: string;
        contentLeft?: string | ReactNode;
        contentRight?: ReactNode;
        contentBottom?: ReactNode;
        iconType?: "filled" | "outlined";
        href?: string;
        index?: number;
    };
}

export const OptionsListItem = ({
    weight,
    variant,
    size,
    contentLeft,
    contentRight = <IconArrowRight />,
    contentBottom,
    label,
    status,
    description,
    iconType = "filled",
    href,
    relativeTime,
    className,
    ...props
}: OptionsListItem.Props) => {
    const liContent = (
        <li className={listItem({ weight, variant, size, className })} {...props}>
            <OptionsListItemLeft
                contentLeft={contentLeft}
                iconType={iconType}
            />
            <OptionsListItemContent
                label={label}
                description={description}
                status={status}
                relativeTime={relativeTime}
                contentBottom={contentBottom}
            />
            <OptionsListItemRight
                contentRight={contentRight}
            />
        </li>
    );

    if (href) {
        return <Link
            href={href}
        >
            {liContent}
        </Link>;
    }
    return liContent;
};