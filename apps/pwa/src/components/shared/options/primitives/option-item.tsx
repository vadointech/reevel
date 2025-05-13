import { ComponentProps, ReactNode } from "react";

import { Back, IconEllipsisVertical, IconSettings } from "@/components/icons";
import { Link } from "@/i18n/routing";

import styles from "../styles.module.scss";
import cx from "classnames";
import Image from "next/image";

export namespace OptionItem {
    export type Props = ComponentProps<"div"> & {
        label: string
        description?: string;
        icon?: ReactNode | string;
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
    children,
    className,
    ...props
}: OptionItem.Props) => {

    const iconLayouts: Record<string, (iconProp: ReactNode | string) => ReactNode> = {
        string: (iconProp) => (
            <div className={styles.option__image}>
                <Image src={iconProp as string} alt={label} width={44} height={44} className={styles.iconString} />
            </div>
        ),
        reactNode: (iconProp) => (
            <div className={styles.option__svg}>{iconProp}</div>
        )
    };

    const renderIcon = () => {
        if (!icon) return null;

        const iconType = typeof icon === 'string' ? 'string' : 'reactNode';
        return iconLayouts[iconType](icon);
    };

    const ItemComponent = () => {
        return (
            <div
                className={cx(
                    styles.option,
                    description && styles.option__svg_mt,
                    className,
                )}
                {...props}
            >
                <div
                    className={cx(
                        styles.option__text,
                        !description && styles.option__text_center,
                        danger && styles.option__text_danger,
                    )}
                >
                    {renderIcon()}
                    <div className={styles.option__text__meta}>

                        {label}
                        {description ?
                            <span>
                                {description}
                            </span>
                            : null
                        }
                    </div>
                </div>
                <div className={styles.option__value}>
                    {value}
                    {children}
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


