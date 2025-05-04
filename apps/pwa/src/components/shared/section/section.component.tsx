import { ComponentProps } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

export type Size = "default" | "small";

export namespace Section {
    export type Props = ComponentProps<"div"> & {
        title: string;
        type?: string;
        size?: Size;
        cols?: boolean
    };
}

export const Section = ({
    title,
    type,
    size = "default",
    children,
    cols,
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

                {type && <div className={styles.section__header__more}>{type}</div>}

            </div>

            <div className={cx(
                styles.section__items,
                cols && styles.section__items__cols,
            )}>
                {children}
            </div>
        </div>
    );
};
