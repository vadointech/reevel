import { intlMiddleware } from "@/i18n/middleware";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { authRoutes, publicRoutes } from "@/routes";

export default async function(request: NextRequest) {
    const {
        nextUrl,
    } = request;

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if(isPublicRoute) {
        return intlMiddleware(request);
    }

    const cookieStore = await cookies();

    const sessionId = cookieStore.get("session_id");
    const accessToken = cookieStore.get("access_token");
    const refreshToken = cookieStore.get("refresh_token");

    const isAuthenticated = !!sessionId && !!accessToken && !!refreshToken;

    if(isAuthenticated) {
        if (isAuthRoute) {
            return Response.redirect(new URL("/", nextUrl));
        }
    }

    if(!isAuthenticated) {
        if(!isAuthRoute) {
            return Response.redirect(new URL("/login", nextUrl));
        }
    }

    return intlMiddleware(request);
};

export const config = {
    matcher: [
        // Enable a redirect to a matching locale at the root
        "/",

        // Set a cookie to remember the previous locale for
        // all requests that have a locale prefix
        "/(uk|en)/:path*",

        // Enable redirects that add missing locales
        // (e.g. `/pathnames` -> `/en/pathnames`)
        "/((?!_next|_vercel|api|.*\\..*).*)",
    ],
};
