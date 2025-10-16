import * as jose from "jose";
import { NextResponse, NextRequest, userAgent } from "next/server";
import { intlMiddleware } from "@/i18n/middleware";
import { ACCESS_JWT_SECRET } from "@/config/env.config";
import {
    AuthJwtTokens,
    AuthAccessTokenPayload,
} from "@/config/auth.config";
import { allowedDevices, onboardingStepRoutes, publicRoutes, StaticRoutes } from "@/config/routes.config";
import { deleteAuthJwtTokens, refreshTokens, setAuthJwtTokens } from "@/auth";

export default async function(request: NextRequest) {
    const { nextUrl } = request;

    const ua = userAgent(request);
    const deviceType = ua.device.type;

    const isAllowedDevice = allowedDevices.includes(deviceType);
    const isScanPage = nextUrl.pathname.startsWith(StaticRoutes.Scan);

    if(!isAllowedDevice) {
        if(!isScanPage) {
            return NextResponse.redirect(new URL(StaticRoutes.Scan, nextUrl), 302);
        }
        return intlMiddleware(request);
    } else {
        if(isScanPage) {
            return NextResponse.redirect(new URL(StaticRoutes.Discover, nextUrl), 302);
        }
    }

    const isPublicRoute = publicRoutes.some(route => nextUrl.pathname.startsWith(route));
    const isLoginRoute = nextUrl.pathname.startsWith(StaticRoutes.Login);
    const isOnboardingRoute = nextUrl.pathname.startsWith(StaticRoutes.Onboarding);

    const accessToken = request.cookies.get(AuthJwtTokens.AccessToken);

    try {
        if(!accessToken?.value) {
            throw new Error("No access token");
        }

        const verificationResult = await jose.jwtVerify<AuthAccessTokenPayload>(
            accessToken.value,
            new TextEncoder().encode(ACCESS_JWT_SECRET),
        );

        if(verificationResult.payload.exp) {
            const timeLeft = verificationResult.payload.exp * 1000 - Date.now();
            const bufferSeconds = 180; // 3 min

            if (timeLeft < bufferSeconds * 1000) {
                throw new Error("Token expired with " + timeLeft + " seconds left.");
            }
        }

        if(verificationResult.payload.completed === -1) {
            if(isOnboardingRoute) {
                return NextResponse.redirect(new URL(StaticRoutes.Discover, nextUrl), 302);
            }
        } else {
            if(!isOnboardingRoute) {
                const stepPath = onboardingStepRoutes[verificationResult.payload.completed];
                if(stepPath) {
                    return NextResponse.redirect(new URL(stepPath, nextUrl), 302);
                }
            }
        }

        if(isLoginRoute) {
            return NextResponse.redirect(new URL(StaticRoutes.Discover, nextUrl), 302);
        }

        return intlMiddleware(request);
    } catch {
        if(isPublicRoute) {
            return intlMiddleware(request);
        }
        // console.log("Access token verification failed: ");

        const refreshToken = request.cookies.get(AuthJwtTokens.RefreshToken);

        try {
            if(!refreshToken?.value) {
                throw new Error("No refresh token");
            }

            const tokensResponse = await refreshTokens(refreshToken.value);

            if(!tokensResponse) {
                throw new Error("Failed to refresh token");
            }

            const response = isLoginRoute ? NextResponse.next() : intlMiddleware(request);

            setAuthJwtTokens(response, tokensResponse);
            return response;
        } catch {
            // console.log("Refresh token verification failed: ");

            const response = isLoginRoute ?
                intlMiddleware(request) :
                NextResponse.redirect(new URL(StaticRoutes.Login, nextUrl), 302);

            deleteAuthJwtTokens(response);
            return response;
        }
    }
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
