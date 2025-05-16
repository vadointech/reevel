import { ComponentProps, ReactNode } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

export type TabButtonVariant = "default" | "primary" | "outline" | "icon" | "dashed";

export namespace TabButton {
    export type Props = Omit<ComponentProps<"button">, "onChange"> & {
        variant?: TabButtonVariant
        name?: string
        icon?: ReactNode | string
        selected?: boolean
    };
}

export const TabButton = ({
    variant = "default",
    name,
    icon,
    selected = false,
    className,
    ...props
}: TabButton.Props) => {

    return (
        <button
            type='button'
            role='switch'
            aria-checked={selected}
            aria-label={name}
            className={cx(
                styles.button,
                styles[`button__variant_${variant}`],
                selected && styles.button__selected,
                className,
            )}
            {...props}
        >
            {icon && (
                <span className={styles.button__icon}>
                    {icon}
                </span>
            )}
            <p className={styles.button__text}>{name}</p>
        </button>
    );
};