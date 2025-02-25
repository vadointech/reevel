import { ComponentProps, ReactNode, useId } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";


export namespace Input {
    export type Variant = "default" | "rounded";
    export type Type = "default" | "large";
    export type Background = "default" | "muted";


    export type Props = ComponentProps<"input"> & {
        variant?: Variant;
        label?: string;
        placeholder: string;
        hint?: string;
        inputSize?: Type;
        error?: string;
        background?: Background;
        icon?: ReactNode
    };
}

export const Input = ({ variant = "default", error, label, placeholder, hint, inputSize = "default", background = "default", icon, ...props }: Input.Props) => {
    const id = useId();

    const InputMode: Record<Input.Type, ReactNode> = {
        default: (
            <input
                id={id}
                placeholder={placeholder}
                className={cx(
                    styles.container__input,
                    styles[`container__input__variant_${variant}`],
                    styles[`container__input__size_${inputSize}`],
                    styles[`container__input__background_${background}`],
                    icon ? styles.container__input__withIcon : false,
                )}
                {...props}
            />
        ),
        large: (
            <textarea
                id={id}
                placeholder={placeholder}
                className={cx(
                    styles.container__input,
                    styles[`container__input__variant_${variant}`],
                    styles[`container__input__size_${inputSize}`],
                    styles[`container__input__background_${background}`],

                )}
            />
        ),
    };

    return (
        <div className={styles.container}>
            {label && (
                <label htmlFor={id} className={styles.container__label}>{label}</label>
            )}


            <div className={styles.container__input__wrapper}>
                {icon && <div className={styles.container__input__icon}>{icon}</div>}

                {InputMode[inputSize]}
            </div>

            {(error || hint) &&
                <span className={cx(
                    styles.container__hint,
                    error && styles.container__error,
                )}> {error || hint} </span>

            }
        </div >
    );
};
