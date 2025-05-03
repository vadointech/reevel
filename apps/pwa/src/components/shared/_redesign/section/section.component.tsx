import { ComponentProps, ReactNode } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Section {
    export type Data = {
        title?: string;
        cta?: string | ReactNode
    };
    export type Props = ComponentProps<"div"> & Data & {
        container?: boolean;
    };
}

export const Section = ({
    className,
    children,
    title,
    cta,
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
                        <h2 className={styles.section__title}>
                            { title }
                        </h2>
                        {
                            cta ? (
                                // TODO: Button component here
                                <span className={styles.section__cta}>
                                    { cta }
                                </span>
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
