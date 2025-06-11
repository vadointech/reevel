"use client";

import { ComponentProps, useState } from "react";
import Link from "next/link";
import { IconCalendar, IconCompas, IconCreate } from "@/components/icons";
import { usePathname } from "@/i18n/routing";
import cx from "classnames";
import styles from "./styles.module.scss";
import { CreateEventDrawer } from "@/components/drawers/create-event";

const NAV_ITEMS = [
    {
        href: "/",
        label: "Discover",
        Icon: IconCompas,
        iconClass: styles.bar__icon_compas,
        match: (pathname: string) => pathname === "/",
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

    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <div className={cx(styles.bar, drawerOpen && styles.hide)} {...props}>
            <nav role="navigation" className={styles.bar__nav}>
                <ul className={styles.bar__list}>
                    <li
                        key={NAV_ITEMS[0].href}
                        className={cx(
                            styles.bar__item,
                            NAV_ITEMS[0].match(pathname) && styles.bar__item_active_compas,
                        )}
                    >
                        <Link
                            href={NAV_ITEMS[0].href}
                            className={styles.bar__link}
                            aria-current={NAV_ITEMS[0].match(pathname) ? "page" : undefined}
                        >
                            <IconCompas className={cx(styles.bar__icon, styles.bar__icon_compas)} />
                            <span className={styles.bar__label}>{NAV_ITEMS[0].label}</span>
                        </Link>
                    </li>

                    <li
                        className={cx(
                            styles.bar__item,
                        )}
                        onClick={() => setDrawerOpen(true)}
                    >
                        <CreateEventDrawer>
                            <div className={styles.bar__link}>
                                <IconCreate className={cx(styles.bar__icon)} />
                                <span className={styles.bar__label}>New Event</span>
                            </div>
                        </CreateEventDrawer>
                    </li>

                    <li
                        key={NAV_ITEMS[1].href}
                        className={cx(
                            styles.bar__item,
                            NAV_ITEMS[1].match(pathname) && styles.bar__item_active,
                        )}
                    >
                        <Link
                            href={NAV_ITEMS[1].href}
                            className={styles.bar__link}
                            aria-current={NAV_ITEMS[1].match(pathname) ? "page" : undefined}
                        >
                            <IconCalendar className={cx(styles.bar__icon, NAV_ITEMS[1].iconClass)} />
                            <span className={styles.bar__label}>{NAV_ITEMS[1].label}</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};