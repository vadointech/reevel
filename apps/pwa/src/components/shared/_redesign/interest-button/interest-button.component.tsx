import { ComponentProps, ReactNode } from "react";
import { Typography } from "@/components/ui";

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
                    <Typography.div size={"sm"} className={styles.button__icon}>
                        { icon }
                    </Typography.div>
                ) : null
            }
            <Typography.span size={"sm"}>
                { children }
            </Typography.span>
        </div>
    );
};
