import { ComponentProps, ReactNode } from "react";
import { IconArrowLeft, IconEllipsisVertical } from "@/components/icons";

import styles from "./styles.module.scss";
import { cva, VariantProps } from "class-variance-authority";

const header = cva(styles.header, {
    variants: {
        size: {
            small: styles.header_size_small,
            default: styles.header_size_default,
            large: styles.header_size_large,
        },
        variant: {
            default: styles.header_variant_default,
            search: styles.header_variant_search,
        },
    },

    defaultVariants: {
        size: "default",
        variant: "default",
    },
});

export namespace Header {
    export type Props = ComponentProps<"header"> & VariantProps<typeof header> & {
        iconBefore?: ReactNode;
        iconAfter?: ReactNode;
        controlBefore?: ReactNode;
        controlAfter?: ReactNode;
    };

    export type SearchProps = ComponentProps<"header"> & VariantProps<typeof header> & {
        iconBefore?: ReactNode;
        controlBefore?: ReactNode;
    };
}

export const Header = ({
    size,
    children,
    iconBefore = <IconArrowLeft />,
    iconAfter,
    controlBefore,
    controlAfter,
    ...props
}: Header.Props) => {
    return (
        <header
            className={header({ size })}
            {...props}
        >
            <div className={styles.header__left}>
                { iconBefore }
                { controlBefore }
            </div>
            <h2 className={styles.header__title}>
                { children }
            </h2>
            <div className={styles.header__right}>
                { iconAfter }
                { controlAfter }
            </div>
        </header>
    );
};

const Search = ({
    size,
    iconBefore = <IconArrowLeft />,
    controlBefore,
    ...props
}: Header.SearchProps) => {
    return (
        <header
            className={header({ size })}
            {...props}
        >
            <div className={styles.header__left}>
                { iconBefore }
                { controlBefore }
            </div>

            <div />
        </header>
    );
};

Header.Search = Search;