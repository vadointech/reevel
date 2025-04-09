import { Children, ComponentProps } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

export type Size = "default" | "small"

export namespace InterestsSection {
    export type Props = ComponentProps<"div"> & {
        title: string;
        count?: boolean;
    };
}

export const InterestsSection = ({
    title,
    children,
    count = false,
    className,
    ...props
}: InterestsSection.Props) => {
    const childrenCount = Children.count(children);
    return (
        <div className={cx(
            styles.section,
            className
        )}
            {...props}
        >
            <h3>{title} {count && `(${(childrenCount)})`}</h3>
            <div className={styles.section__items}>
                {children}
            </div>
        </div>
    );
}
