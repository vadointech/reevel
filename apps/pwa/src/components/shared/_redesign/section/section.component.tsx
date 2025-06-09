import { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/shared/_redesign";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Section {
    export type Variant = Button.Variant;
    export type Data = {
        title?: string;
        description?: string;
        cta?: string | ReactNode;
    };
    export type Props = ComponentProps<"div"> & Data & {
        container?: boolean;
        variant?: Button.Variant;
        onCtaClick?: () => void;
        ctaHref?: string;
    };
}

export const Section = ({
    className,
    children,
    title,
    description,
    cta,
    variant = "text-primary",
    container = false,
    onCtaClick,
    ctaHref,
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
                        <div className={styles.section__wrapper}>
                            <h2 className={styles.section__title}>
                                {title}
                            </h2>
                            {
                                cta ? (
                                    <Button
                                        size={"small"}
                                        variant={variant}
                                        style={{
                                            width: "fit-content",
                                            padding: 0,
                                        }}
                                        href={ctaHref}
                                        onClick={onCtaClick}
                                    >
                                        {cta}
                                    </Button>
                                ) : null
                            }
                        </div>
                        {
                            description ? (
                                <div className={styles.section__description}>{description}</div>
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
                        {children}
                    </div>
                ) : null
            }
        </div>
    );
};
