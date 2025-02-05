// Title.tsx
import { type ComponentProps } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Title {
    export type Props = ComponentProps<"div"> & {
        size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
        weight?: 400 | 500 | 600 | 700;
        align?: "left" | "center" | "right";
        className?: string;
        children: React.ReactNode;
    }
}

export const Title = ({
    size = "base",
    weight = 400,
    align = "left",
    className,
    children,
    ...props
}: Title.Props) => {
    return (
        <div
            className={cx(
                styles.title,
                styles[`title--${size}`],
                styles[`title--weight-${weight}`],
                styles[`title--align-${align}`],
                className
            )}
            {...props}
        >
            <div className={styles.title__head}>
                {children}
            </div>
        </div>
    );
};