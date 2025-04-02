import { Children, ComponentProps, ReactNode } from "react";
import styles from "../styles.module.scss";
import cx from "classnames";
import { Back } from "@/components/icons";
import { Link } from "@/i18n/routing";

export namespace OptionItem {
    export type Props = ComponentProps<"div"> & {
        label: string
        icon?: ReactNode;
        backIcon?: boolean;
        warn?: boolean;
        href?: string
        onClick?: () => void;
    };
}

export const OptionItem = ({
    label,
    icon,
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
                    styles.option__label,
                    warn && styles.option__label__warn
                )}>
                    {icon && icon}
                    {label}
                </div>
                {backIcon && <Back width={7} height={14} style={{ rotate: "180deg" }} />}
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


