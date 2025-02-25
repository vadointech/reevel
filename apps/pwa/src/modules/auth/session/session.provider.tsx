"use client";

import { observer } from "mobx-react-lite";
import { ReactNode } from "react";
import { sessionStore } from "@/modules/auth/session/session.store";
import { usePathname, redirect } from "@/i18n/routing";
import { authRoutes, publicRoutes } from "./routes";
import { useLocale } from "next-intl";

namespace SessionProvider {
    export type Props = {
        children: ReactNode
    };
}

export const SessionProvider = observer(({ children }: SessionProvider.Props) => {
    const pathname = usePathname();
    const locale = useLocale();

    const isPublicRoute = publicRoutes.includes(pathname);
    const isAuthRoute = authRoutes.includes(pathname);

    if(sessionStore.status === "loading") return "Loading skeleton...";

    if(isPublicRoute) return children;

    if(sessionStore.isAuthenticated) {
        if(isAuthRoute) return redirect({
            href: "/",
            locale,
        });
        return children;
    } else {
        if(isAuthRoute) return children;
        return redirect({
            href: "/login",
            locale,
        });
    }
});