import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AuthJwtTokens } from "@/config/auth.config";
import { deleteAuthJwtTokens, refreshTokens, setAuthJwtTokens } from "@/auth";
import { API_URL } from "@/config/env.config";

function apiRequest(url: string | URL, request: NextRequest, init: RequestInit = {}) {
    return fetch(url, {
        body: request.method !== "GET" && request.method !== "HEAD" ? request.clone().body : undefined,
        credentials: "omit",
        ...init,
    });
}

async function handler(request: NextRequest) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(AuthJwtTokens.AccessToken);
    const refreshToken = cookieStore.get(AuthJwtTokens.RefreshToken);

    const url = new URL(request.nextUrl.pathname, API_URL);
    request.nextUrl.searchParams.forEach((value, key) => {
        url.searchParams.append(key, value);
    });

    const headers = new Headers(request.headers);
    if(accessToken) {
        headers.set("Authorization", `Bearer ${accessToken.value}`);
    }

    try {
        let response = await apiRequest(url, request);

        if(response.status === 401 && refreshToken) {
            const tokensResponse = await refreshTokens(request, refreshToken.value);

            let finalResponse = new NextResponse();

            if(!tokensResponse) {
                deleteAuthJwtTokens(finalResponse);
                return new NextResponse(response.body, { status: 401 });
            }

            response = await apiRequest(url, request);

            finalResponse = new NextResponse(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
            });


            setAuthJwtTokens(finalResponse, tokensResponse);
            return finalResponse;
        }

        return response;
    } catch (error) {
        console.error("Error in API proxy:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;