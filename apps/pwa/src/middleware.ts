import * as jose from "jose";
import { NextResponse, NextRequest, userAgent } from "next/server";
import { intlMiddleware } from "@/i18n/middleware";
import {
    AuthJwtTokens,
    StaticRoutes,
    ACCESS_JWT_SECRET,
    publicRoutes,
    allowedDevices,
    AuthAccessTokenPayload,
    onboardingStepRoutes, authCookiesParams,
} from "@/auth.config";
import { refreshTokens } from "@/api/auth";

export default async function(request: NextRequest) {
    const { nextUrl } = request;

    const ua = userAgent(request);
    const deviceType = ua.device.type;

    const isAllowedDevice = allowedDevices.includes(deviceType);
    const isScanPage = nextUrl.pathname.startsWith(StaticRoutes.Scan);

    if(!isAllowedDevice) {
        if(!isScanPage) {
            return NextResponse.redirect(new URL(StaticRoutes.Scan, nextUrl));
        }
        return intlMiddleware(request);
    }

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isLoginRoute = nextUrl.pathname.startsWith(StaticRoutes.Login);
    const isOnboardingRoute = nextUrl.pathname.startsWith(StaticRoutes.Onboarding);

    if(nextUrl.pathname === StaticRoutes.Root) {
        return NextResponse.redirect(new URL(StaticRoutes.Discover, nextUrl));
    }

    if(isPublicRoute) {
        return intlMiddleware(request);
    }

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
                return NextResponse.redirect(new URL(StaticRoutes.Discover, nextUrl));
            }
        } else {
            if(!isOnboardingRoute) {
                const stepPath = onboardingStepRoutes[verificationResult.payload.completed];
                if(stepPath) {
                    return NextResponse.redirect(new URL(stepPath, nextUrl));
                }
            }
        }

        if(isLoginRoute) {
            return NextResponse.redirect(new URL(StaticRoutes.Discover, nextUrl));
        }

        return intlMiddleware(request);
    } catch(error: any) {
        console.log("Access token verification failed: ", error.message);

        const refreshToken = request.cookies.get(AuthJwtTokens.RefreshToken);

        try {
            if(!refreshToken?.value) {
                throw new Error("No refresh token");
            }

            const tokensResponse = await refreshTokens({
                authorization: {
                    method: "Bearer",
                    token: refreshToken.value,
                },
            });

            if(!tokensResponse.ok || !tokensResponse.data) {
                throw new Error("Failed to refresh token");
            }

            const response = isLoginRoute ? NextResponse.next() : intlMiddleware(request);

            response.cookies.set(AuthJwtTokens.AccessToken, tokensResponse.data.accessToken, authCookiesParams);
            response.cookies.set(AuthJwtTokens.RefreshToken, tokensResponse.data.refreshToken, authCookiesParams);

            return response;
        } catch(error: any) {
            console.log("Refresh token verification failed: ", error.message);

            const response = isLoginRoute ?
                intlMiddleware(request) :
                NextResponse.redirect(new URL(StaticRoutes.Login, nextUrl));

            response.cookies.delete({
                name: AuthJwtTokens.AccessToken,
                ...authCookiesParams,
            });
            response.cookies.delete({
                name: AuthJwtTokens.RefreshToken,
                ...authCookiesParams,
            });
            
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
