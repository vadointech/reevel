import { ComponentProps } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

export type Size = "default" | "small"

export namespace InterestsSection {
    export type Props = ComponentProps<"div"> & {
        title: string;
    };
}

export const InterestsSection = ({
    title,
    children,
    className,
    ...props
}: InterestsSection.Props) => {
    return (
        <div className={cx(
            styles.section,
            className
        )}
            {...props}
        >
            <h3>{title}</h3>
            <div className={styles.section__items}>
                {children}
            </div>
        </div>
    );
}
