"use client";

import { ComponentProps } from "react";
import Link from "next/link";
import { IconCalendar, IconCompas, IconCreate } from "@/components/icons";
import { usePathname } from "@/i18n/routing";
import cx from "classnames";
import styles from "./styles.module.scss";
import { CreateEventDrawer } from "@/components/drawers/create-event";
import { useBottomSheetIsOpen } from "./hooks/use-bottom-sheet-is-open";

const NAV_ITEMS = [
    {
        href: "/",
        label: "Discover",
        Icon: IconCompas,
        iconClass: styles.bar__icon_compas,
        match: (pathname: string) => pathname === "/",
        activeClass: styles.bar__item_active_compas,
    },
    {
        href: "/calendar",
        label: "Calendar",
        Icon: IconCalendar,
        iconClass: "",
        match: (pathname: string) => pathname.startsWith("/calendar"),
        activeClass: styles.bar__item_active,
    },
];

export const BottomNavBar = (props: ComponentProps<"div">) => {
    const pathname = usePathname();
    const open = useBottomSheetIsOpen();

    return (
        <div className={cx(styles.bar, open && styles.hide)} {...props}>
            <nav role="navigation" className={styles.bar__nav}>
                <ul className={styles.bar__list}>
                    {renderNavItem(NAV_ITEMS[0], pathname)}
                    <li className={styles.bar__item}>
                        <CreateEventDrawer>
                            <div className={styles.bar__link}>
                                <IconCreate className={styles.bar__icon} />
                                <span className={styles.bar__label}>New Event</span>
                            </div>
                        </CreateEventDrawer>
                    </li>
                    {renderNavItem(NAV_ITEMS[1], pathname)}
                </ul>
            </nav>
        </div>
    );
};


const renderNavItem = (
    { href, label, Icon, iconClass, match, activeClass }: (typeof NAV_ITEMS)[number],
    pathname: string,
) => (
    <li
        key={href}
        className={cx(styles.bar__item, match(pathname) && activeClass)}
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
);
