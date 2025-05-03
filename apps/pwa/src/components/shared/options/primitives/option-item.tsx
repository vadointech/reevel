import { ComponentProps, ReactNode } from "react";

import { Back } from "@/components/icons";
import { Link } from "@/i18n/routing";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace OptionItem {
    export type Props = ComponentProps<"div"> & {
        label: string
        description?: string;
        icon?: ReactNode;
        value?: string | number;
        backIcon?: boolean;
        danger?: boolean;
        href?: string
    };
}

export const OptionItem = ({
    label,
    description,
    icon,
    value,
    backIcon = false,
    danger = false,
    href,
    className,
    ...props
}: OptionItem.Props) => {

    const ItemComponent = () => {
        return (
            <div
                className={cx(
                    styles.option,
                    className,
                )}
                {...props}
            >
                <div
                    className={cx(
                        styles.option__text,
                        danger && styles.option__text_danger,
                    )}
                >
                    {icon ? icon : null }
                    <div className={styles.option__text__meta}>
                        {label}
                        <span>
                            {description}
                        </span>
                    </div>
                </div>
                <div className={styles.option__value}>
                    {value}
                    {backIcon && <Back width={7} height={14} style={{ rotate: "180deg" }} />}
                </div>
            </div>
        );
    };

    if (href) {
        return (
            <Link href={href}>
                <ItemComponent />
            </Link>
        );
    }

    return <ItemComponent />;
};


