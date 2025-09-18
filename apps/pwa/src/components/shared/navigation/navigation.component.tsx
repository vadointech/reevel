"use client";

import { ComponentProps, ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { IconCalendar, IconCalendarOutline, IconCompas, IconCompasOutline, IconCreate } from "@/components/icons";
import { NavigationRoutes } from "./navigation.config";
import { CreateEventDrawer } from "@/components/drawers/create-event";
import { useStandaloneContext } from "@/providers/standalone.provider";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Navigation {
    export type Props = ComponentProps<"nav"> & {
        currentPage: NavigationRoutes;
    };
    export type ItemProps = ComponentProps<"a"> & LinkProps & {
        label: string;
        currentPage: NavigationRoutes;
        renderIcon: (active: boolean) => ReactNode;
    };
}

export const Navigation = ({
    currentPage,
    className,
    ...props
}: Navigation.Props) => {
    const isStandalone = useStandaloneContext();

    return (
        <nav
            role={"navigation"}
            className={cx(
                styles.navbar,
                isStandalone && styles.navbar_standalone,
                className,
            )}
            {...props}
        >
            <NavigationItem
                label={"Discover"}
                href={"/discover"}
                currentPage={currentPage}
                renderIcon={
                    (active) => active ? <IconCompas /> : <IconCompasOutline />
                }
            />

            <CreateEventDrawer className={styles.navbar__link}>
                <IconCreate/>
                New Event
            </CreateEventDrawer>

            <NavigationItem
                label={"Calendar"}
                href={"/calendar"}
                currentPage={currentPage}
                renderIcon={
                    (active) => active ? <IconCalendar /> : <IconCalendarOutline />
                }
            />
        </nav>
    );
};


const NavigationItem = ({
    label,
    href,
    currentPage,
    renderIcon,
    className,
    ...props
}: Navigation.ItemProps) => {
    const active = href === currentPage;
    return (
        <Link
            href={href}
            className={cx(
                styles.navbar__link,
                active && styles.navbar__link_active,
                className,
            )}
            {...props}
        >
            { renderIcon(active) }
            { label }
        </Link>
    );
};
