import { Children, ComponentProps, ReactNode } from "react";
import styles from "../styles.module.scss";
import cx from "classnames";
import { Back } from "@/components/icons";
import { Link } from "@/i18n/routing";

export namespace OptionItem {
    export type Props = ComponentProps<"div"> & {
        label: string
        description?: string;
        icon?: ReactNode;
        value?: string | number;
        backIcon?: boolean;
        warn?: boolean;
        href?: string
        onClick?: () => void;
    };
}

export const OptionItem = ({
    label,
    description,
    icon,
    value,
    backIcon = false,
    warn,
    href,
    onClick,
    className,
    ...props
}: OptionItem.Props) => {

    const ItemComponent = () => {
        return (
            <div className={styles.option} onClick={onClick} {...props}>
                <div className={cx(
                    styles.option__text,
                    warn && styles.option__text__warn
                )}>
                    {icon && icon}
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
    }

    if (href) {
        return (
            <Link href={href}>
                <ItemComponent />
            </Link>
        );
    }

    return <ItemComponent />
}


