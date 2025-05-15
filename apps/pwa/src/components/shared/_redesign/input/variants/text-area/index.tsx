import { ComponentProps } from "react";

import baseStyles from "../../base-styles.module.scss";
import styles from "./styles.module.scss";
import cx from "classnames";

export namespace InputTextArea {
    export type Props = ComponentProps<"textarea"> & {
        label?: string;
        error?: string;
    };
}

export const InputTextArea = ({
    label,
    error,
    ...props
}: InputTextArea.Props) => {
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
                <textarea {...props} />
            </label>
            {
                error ? (
                    <span className={baseStyles.input__error}>{ error }</span>
                ): null
            }
        </div>
    );
};
