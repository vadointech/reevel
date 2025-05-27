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
        image?: string;
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
    image,
    value,
    backIcon = false,
    danger = false,
    href,
    children,
    className,
    ...props
}: OptionItem.Props) => {

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
                    {icon && <div className={styles.option__svg}>{icon}</div>}
                    {image &&
                        <div className={styles.option__image}>
                            <Image src={image} alt={label} width={44} height={44} className={styles.iconString} />
                        </div>
                    }
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
                <div
                    className={styles.option__value}>
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


