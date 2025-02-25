import { ComponentProps } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import { Badge } from "@/components/ui/badge/badge.component";

export type Size = "default" | "small"

export namespace Section {
    export type Props = ComponentProps<"div"> & {
        title: string;
        type: string;
        size?: Size
    };
}

export const Section = ({
    title,
    type,
    size = 'default',
    children,
    className,
    ...props
}: Section.Props) => {
    return (
        <div className={cx(
            styles.section,
            className
        )}
            {...props}
        >
            <div className={cx(
                styles.section__header,
            )}
            >
                <h2 className={cx(
                    styles.section__header__title,
                    styles[`section__header__title__size_${size}`]
                )}
                >
                    {title}
                </h2>
                <Badge type="Public" variant="default" icon={false} />
            </div>

            {children}

        </div>
    );
}
