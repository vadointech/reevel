import { ComponentProps } from "react";
import { InputNumber, InputSearch, InputTextArea } from "./variants";

import baseStyles from "./base-styles.module.scss";
import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Input {
    export type Props = ComponentProps<"input"> & {
        label?: string;
        error?: string;
    };
}

export const Input = ({
    label,
    error,
    ...props
}: Input.Props) => {
    return (
        <div className={baseStyles.input__warpper}>
            <label
                className={cx(
                    baseStyles.input,
                    styles.input,
                    error ? baseStyles.input_state_error : baseStyles.input_state_default,
                )}
            >
                {
                    label ? (
                        <span className={baseStyles.input__label}>
                            { label }
                        </span>
                    ) : null
                }
                <input type={"text"} {...props} />
            </label>
            {
                error ? (
                    <span className={baseStyles.input__error}>{ error }</span>
                ): null
            }
        </div>
    );
};

Input.Number = InputNumber;
Input.TextArea = InputTextArea;
Input.Search = InputSearch;