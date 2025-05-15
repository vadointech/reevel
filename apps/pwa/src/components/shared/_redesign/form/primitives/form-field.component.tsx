import { ComponentProps } from "react";

import { UISize } from "@/types/common";
import { ControllerFieldState } from "react-hook-form";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace FormField {
    export type Props = ComponentProps<"div"> & {
        gap?: UISize;
        state?: ControllerFieldState
    };
}

export const FormField = ({
    gap = "default",
    className,
    children,
    state,
    ...props
}: FormField.Props) => {
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
                state?.error?.message ? (
                    <span className={styles.form__error}>{ state?.error.message }</span>
                ): null
            }
        </div>
    );
};
