import { type ComponentProps, ReactNode } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";
import { Link } from "@/i18n/routing";

export namespace EventButton {
    export type Props = ComponentProps<"button"> & {
        icon?: ReactNode;
        href?: string;
        fill?: boolean
    };
}

export const EventButton = ({
    icon,
    fill,
    href,
    className,
    children,
    ...props
}: EventButton.Props) => {

    const EventButtonComponent = () => {
        return (
            <button
                className={cx(
                    styles.button,
                    fill && styles.button_fill,
                    className,
                )}
                {...props}
            >
                {icon}
                <span>{children}</span>
            </button>
        );
    };

    if (href) {
        return (
            <Link href={href}>
                <EventButtonComponent />
            </Link>
        );
    }

    return <EventButtonComponent />;
};