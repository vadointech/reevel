import { ComponentProps, ReactNode } from "react";

import { IconArrowRight } from "@/components/icons";

import styles from "../styles.module.scss";
import { cva } from "class-variance-authority";
import cx from "classnames";

const listItem = cva(styles.option__item, {
    variants: {
        variant: {
        },
    },
});

export namespace OptionsListItem {
    export type Props = Omit<ComponentProps<"li">, "children"> & {
        label: string | ReactNode;
        description?: string | ReactNode;
        contentLeft?: string | ReactNode;
        contentRight?: ReactNode;
        iconType?: "filled" | "outlined"
    };
}

export const OptionsListItem = ({
    contentLeft,
    contentRight = <IconArrowRight />,
    label,
    description,
    iconType = "filled",
    ...props
}: OptionsListItem.Props) => {
    return (
        <li
            className={styles.listItem}
            {...props}
        >
            {
                contentLeft && (
                    <div
                        className={cx(
                            styles.listItem__left,
                            styles[`listItem__left_icon_${iconType}`],
                        )}
                    >
                        { contentLeft }
                    </div>
                )
            }
            <div className={styles.listItem__content}>
                <div className={styles.listItem__title}>{ label }</div>
                {
                    description && (
                        <div className={styles.listItem__description}>{ description }</div>
                    )
                }
            </div>
            {
                contentRight && (
                    <div className={styles.listItem__right}>
                        { contentRight }
                    </div>
                )
            }
        </li>
    );
};
