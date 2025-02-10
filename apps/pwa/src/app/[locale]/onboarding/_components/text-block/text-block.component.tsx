import { ComponentProps } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace OnboardingTextBlock {
  export type Props = ComponentProps<"div"> & {
    title?: string;
    subtitle?: string;
  }
}

export const OnboardingTextBlock = ({
    title,
    subtitle,
    className,
    ...props
}: OnboardingTextBlock.Props) => {
    return (
        <div
            className={cx(
                styles.block,
                className
            )}
            {...props}
        >
            <h1 className={styles.block__title}>
                { title }
            </h1>
            <p className={styles.block__subtitle}>
                { subtitle }
            </p>
        </div>
    );
};