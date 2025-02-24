import { ComponentProps, useId } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";


export namespace Input {
    export type Variant = "default" | "rounded";
    export type Size = "default" | "large";

    export type Props = ComponentProps<"input"> & {
        variant?: Variant;
        label?: string;
        placeholder: string;
        hint?: string;
        inputSize?: Size;
        error?: string;
    };
}

export const Input = ({ variant = "default", error, label, placeholder, hint, inputSize = "default", ...props }: Input.Props) => {
    const id = useId();

    return (
        <div className={styles.container}>
            {label && <label htmlFor={id} className={styles.container__label}>{label}</label>}

            {inputSize == "default" ?
                <input
                    id={id}
                    placeholder={placeholder}
                    className={cx(
                        styles.container__input,
                        styles[`container__input__variant_${variant}`],
                        styles[`container__input__size_${inputSize}`],
                    )}
                    {...props}
                />
                : <textarea
                    id={id}
                    placeholder={placeholder}
                    className={cx(
                        styles.container__input,
                        styles[`container__input__variant_${variant}`],
                        styles[`container__input__size_${inputSize}`],
                        { ...props },
                    )} />
            }

            {(error || hint) &&
                <span className={cx(
                    styles.container__hint,
                    error && styles.container__error,
                )}> {error || hint} </span>

            }
        </div >
    );
};
