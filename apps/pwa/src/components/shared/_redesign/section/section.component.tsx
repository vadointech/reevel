import { ComponentProps, ReactNode } from "react";
import { Typography } from "@/components/ui";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Section {
    export type Variant = "default" | "accent";
    export type Data = {
        title?: string;
        cta?: string | ReactNode
    };
    export type Props = ComponentProps<"div"> & Data & {
        container?: boolean;
        variant?: Variant;
    };
}

export const Section = ({
    className,
    children,
    title,
    cta,
    variant = "default",
    container = false,
    ...props
}: Section.Props) => {
    return (
        <div
            className={cx(
                styles.section,
                className,
            )}
            {...props}
        >
            {
                title ? (
                    <div className={styles.section__head}>
                        <Typography.h2 size={"lg"} className={styles.section__title}>
                            { title }
                        </Typography.h2>
                        {
                            cta ? (
                                // TODO: Button component here
                                <Typography.span
                                    size={"sm"}
                                    className={cx(
                                        styles.section__cta,
                                        styles[`section__cta_${variant}`],
                                    )}
                                >
                                    { cta }
                                </Typography.span>
                            ) : null
                        }
                    </div>
                ) : null
            }

            {
                children ? (
                    <div
                        className={cx(
                            styles.section__content,
                            container && styles.section__content_container,
                        )}
                    >
                        { children }
                    </div>
                ) : null
            }
        </div>
    );
};
