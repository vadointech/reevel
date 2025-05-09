import { ComponentProps } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import { Badge } from "@/components/ui/badge/badge.component";
import { SectionItems } from "./primitives/secion-items.component";
import Link from "next/link";

export type Size = "default" | "small";

export namespace Section {
    export type Props = ComponentProps<"div"> & {
        title: string;
        type?: string;
        size?: Size;
        onClick?: () => void;
        href?: string;
    };
}

export const Section = ({
    title,
    type,
    size = 'default',
    href,
    onClick,
    children,
    className,
    ...props
}: Section.Props) => {
    return (
        <div className={cx(
            styles.section,
            className,
        )}
            {...props}
        >
            <div className={cx(
                styles.section__header,
            )}
            >
                <h2 className={cx(
                    styles.section__header__title,
                    styles[`section__header__title__size_${size}`],
                )}
                >
                    {title}
                </h2>

                {href && <Link href={href}>{type && <div onClick={onClick} className={styles.section__header__more}>{type}</div>}</Link>}


            </div>
            {children}
        </div>
    );
}

