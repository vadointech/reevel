import { ComponentProps, ReactNode } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace InterestButton {

    export type Variant = "default" | "text" | "primary";

    export type Props = ComponentProps<"div"> & {
        variant?: Variant;
        icon?: string | ReactNode
    };
}

export const InterestButton = ({
    variant = "default",
    icon,
    className,
    children,
    ...props
}: InterestButton.Props) => {
    return (
        <div
            className={cx(
                styles.button,
                styles[`button_${variant}`],
                className,
            )}
            {...props}
        >
            {
                icon ? (
                    <div className={styles.button__icon}>
                        { icon }
                    </div>
                ) : null
            }
            <span className={styles.button_text}>{ children }</span>
        </div>
    );
};
