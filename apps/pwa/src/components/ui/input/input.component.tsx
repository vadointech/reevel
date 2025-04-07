import { ComponentProps, memo, ReactNode, useId } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Input {
    export type Variant = "default" | "rounded" | "numeric";
    export type Background = "default" | "muted";

    export type BaseProps = {
        variant?: Variant;
        label?: string;
        placeholder?: string;
        hint?: string;
        error?: string;
        background?: Background;
        icon?: ReactNode
        children?: ReactNode
    };

    export type InputProps = ComponentProps<"input"> & BaseProps;
    export type TextAreaProps = ComponentProps<"textarea"> & BaseProps;
}

const InputBase = memo(({
    label,
    variant,
    hint,
    error,
    icon,
    children,
}: Input.BaseProps) => {
    const id = useId();
    return (
        <div className={styles.container}>
            {
                label ? (
                    variant !== "numeric" ?
                        <label htmlFor={id} className={styles.container__label}>
                            {label}
                        </label>
                        : null
                ) : null
            }


            <div className={styles.container__input__wrapper}>
                {
                    icon ? (
                        <div className={styles.container__input__icon}>
                            {icon}
                        </div>
                    ) : null
                }

                {children}
            </div>

            {
                label ? (
                    variant == "numeric" ?
                        <label htmlFor={id} className={styles[`container__label_${variant}`]}>
                            {label}
                        </label>
                        : null
                ) : null
            }

            {
                (error || hint) ? (
                    <span
                        className={cx(
                            styles.container__hint,
                            error && styles.container__error,
                        )}
                    >
                        {error || hint}
                    </span>
                ) : null
            }
        </div>
    );
});

export const Input = memo(({
    label,
    hint,
    error,
    icon,
    variant,
    background,
    className,
    ...props
}: Input.InputProps) => {
    return (
        <InputBase
            label={label}
            hint={hint}
            error={error}
            icon={icon}
            variant={variant}
        >
            <input
                className={cx(
                    styles.container__input,
                    styles.container__input__size_default,
                    styles[`container__input__variant_${variant}`],
                    styles[`container__input__background_${background}`],
                    icon ? styles.container__input__withIcon : false,
                    className,
                )}
                {...props}
            />
        </InputBase>
    );
});


export const TextArea = memo(({
    label,
    hint,
    error,
    icon,
    variant,
    background,
    className,
    ...props
}: Input.TextAreaProps) => {
    return (
        <InputBase
            label={label}
            hint={hint}
            error={error}
            icon={icon}
        >
            <textarea
                className={cx(
                    styles.container__input,
                    styles.container__input__size_large,
                    styles[`container__input__variant_${variant}`],
                    styles[`container__input__background_${background}`],
                    icon ? styles.container__input__withIcon : false,
                    className,
                )}
                {...props}
            />
        </InputBase>
    );
});