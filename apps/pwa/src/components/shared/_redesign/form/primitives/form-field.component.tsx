import { ComponentProps } from "react";

import { UISize } from "@/types/common";
import { ControllerFieldState } from "react-hook-form";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace FormField {
    export type Props = ComponentProps<"div"> & {
        gap?: UISize;
        state?: ControllerFieldState
        nestedError?: string;
    };
}

export const FormField = ({
    gap = "default",
    className,
    children,
    state,
    nestedError,
    ...props
}: FormField.Props) => {

    const error = state?.error?.message ||
      nestedError?.split(".").reduce((acc, key) => acc?.[key], state?.error as any)?.message;



    return (
        <div
            aria-invalid={!!state?.invalid}
            className={cx(
                styles.form__field,
                styles[`form__gap_${gap}`],
                className,
            )}
            {...props}
        >
            { children }
            {
                error ? (
                    <span className={styles.form__error}>{ error }</span>
                ): null
            }
        </div>
    );
};
