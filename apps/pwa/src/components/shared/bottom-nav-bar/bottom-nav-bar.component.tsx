"use client";

import { ComponentProps } from "react";
import Link from "next/link";
import { IconCalendar, IconCompas, IconCreate } from "@/components/icons";
import { usePathname } from "@/i18n/routing";
import cx from "classnames";
import styles from "./styles.module.scss";

const NAV_ITEMS = [
    {
        href: "/",
        label: "Discover",
        Icon: IconCompas,
        iconClass: styles.bar__icon_compas,
        match: (pathname: string) => pathname === "/",
    },
    {
        href: "/event/create",
        label: "New event",
        Icon: IconCreate,
        iconClass: "",
        match: (pathname: string) => pathname.startsWith("/event/create"),
    },
    {
        href: "/calendar",
        label: "Calendar",
        Icon: IconCalendar,
        iconClass: "",
        match: (pathname: string) => pathname.startsWith("/calendar"),
    },
];

export const BottomNavBar = (props: ComponentProps<"div">) => {
    const pathname = usePathname();

    return (
        <div className={styles.bar} {...props}>
            <nav role="navigation" className={styles.bar__nav}>
                <ul className={styles.bar__list}>
                    {NAV_ITEMS.map(({ href, label, Icon, iconClass, match }) => (
                        <li
                            key={href}
                            className={cx(
                                styles.bar__item,
                                match(pathname) && styles.bar__item_active,
                            )}
                        >
                            <Link
                                href={href}
                                className={styles.bar__link}
                                aria-current={match(pathname) ? "page" : undefined}
                            >
                                <Icon className={cx(styles.bar__icon, iconClass)} />
                                <span className={styles.bar__label}>{label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};