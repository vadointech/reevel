import { intlMiddleware } from "@/i18n/middleware";

export default intlMiddleware;

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
