"use client";

import { ReactNode, useEffect } from "react";
import { GetSession } from "@/api/auth/get-session";
import { sessionStore } from "@/stores/session.store";
import { usePathname, useRouter } from "@/i18n/routing";
import { authRoutes, publicRoutes } from "./routes";

export namespace SessionProvider {
    export type Props = {
        session: Maybe<GetSession.TOutput>
        children: ReactNode
    };
}

export const SessionProvider = ({ children, session: sessionInit }: SessionProvider.Props) => {
    const router = useRouter();
    const pathname = usePathname();

    const isPublicRoute = publicRoutes.includes(pathname);
    const isAuthRoute = authRoutes.includes(pathname);
    const isAuthorized = !!sessionStore.init(sessionInit);

    useEffect(() => {
        if(isAuthorized) {
            if(isAuthRoute) return router.replace("/");
            return;
        } else {
            if(isPublicRoute) return;
            if(isAuthRoute) return;
            router.replace("/login");
        }
    }, [isAuthorized, isAuthRoute, isPublicRoute]);

    if (isAuthorized || isPublicRoute || isAuthRoute) return children;

    return null;
};