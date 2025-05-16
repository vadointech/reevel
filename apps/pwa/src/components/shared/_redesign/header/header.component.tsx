import { ComponentProps, ReactNode, MouseEvent } from "react";
import { IconArrowLeft, IconSearch } from "@/components/icons";
import { Input } from "@/components/shared/_redesign";

import { cva, VariantProps } from "class-variance-authority";

import { Link } from "@/i18n/routing";
import { InputSearch } from "@/components/shared/_redesign/input/variants";

import styles from "./styles.module.scss";

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

    export type SearchProps = VariantProps<typeof header> & InputSearch.Props & {
        iconBefore?: ReactNode;
        controlBefore?: ReactNode;
        onControlClick?: (event: MouseEvent<HTMLDivElement>) => void;
        controlHref?: string;
    };
}

export const Header = ({
    size,
    children,
    iconBefore,
    iconAfter,
    controlBefore,
    controlAfter,
    className,
    ...props
}: Header.Props) => {
    return (
        <header
            className={header({ size, className })}
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
    onControlClick,
    controlHref,
    className,
    ...props
}: Header.SearchProps) => {
    const Control = () => {
        return (
            <div
                onClick={onControlClick}
                className={styles.header__left}
            >
                { iconBefore }
                { controlBefore }
            </div>
        );
    };
    return (
        <header className={header({ size, variant: "search" , className })}>
            {
                controlHref ? (
                    <Link href={controlHref}>
                        <Control />
                    </Link>
                ) : (
                    <Control />
                )
            }

            <Input.Search
                placeholder={"Search"}
                iconBefore={<IconSearch />}
                {...props}
            />
        </header>
    );
};

Header.Search = Search;