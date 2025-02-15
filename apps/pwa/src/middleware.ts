import { intlMiddleware } from "@/i18n/middleware";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { publicRoutes } from "@/routes";

export default async function(request: NextRequest) {
    const {
        nextUrl,
    } = request;

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    if(isPublicRoute) {
        return intlMiddleware(request);
    }

    const cookieStore = await cookies();
    const session = cookieStore.get("session_user");

    const isAuthorized = !!session?.value;

    if(!isAuthorized) {
        return Response.redirect(new URL("/login", nextUrl));
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
