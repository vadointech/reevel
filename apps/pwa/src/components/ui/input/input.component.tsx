import { ComponentProps, memo, ReactNode, useId } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Input {
    export type Variant = "default" | "rounded" | "numeric";
    export type Type = "input" | "textarea"

    export type BaseProps = {
        variant: Variant;
        label?: string;
        placeholderr?: string;
        hint?: string;
        error?: string;
        icon?: ReactNode
        type?: Type,
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
    placeholderr,
    type,
    children,
}: Input.BaseProps) => {
    const id = useId();
    return (
        <div className={styles.container}>


            <div className={styles.container__input__wrapper}>
                {children}

                {placeholderr &&
                    <span className={cx(
                        styles.container__placeholder,
                        styles[`container__placeholder_${type}`],
                        icon ? styles.container__placeholder_withIcon : false,
                    )}>{placeholderr}</span>
                }

                {
                    icon ? (
                        <div className={styles.container__input__icon}>
                            {icon}
                        </div>
                    ) : null
                }

                {
                    !icon && label ? (
                        variant !== "numeric" ?
                            <label htmlFor={id} className={styles.container__label}>
                                {label}
                            </label>
                            : null
                    ) : null
                }
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
    placeholderr,
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
            placeholderr={placeholderr}
            type="input"
        >
            <input
                className={cx(
                    styles.container__input,
                    styles[`container__input__variant_${variant}`],
                    icon ? styles.container__input__withIcon : false,
                    className,
                )}
                placeholder=""
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
    placeholderr,
    className,
    ...props
}: Input.TextAreaProps) => {
    return (
        <InputBase
            variant={variant}
            label={label}
            hint={hint}
            error={error}
            icon={icon}
            placeholderr={placeholderr}
            type="textarea"
        >
            <textarea
                className={cx(
                    styles.container__input,
                    styles.container__input__size_large,
                    styles[`container__input__variant_${variant}`],
                    icon ? styles.container__input__withIcon : false,
                    className,
                )}
                placeholder=""
                {...props}
            />
        </InputBase>
    );
});