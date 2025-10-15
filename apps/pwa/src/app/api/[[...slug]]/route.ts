import { NextRequest, NextResponse } from "next/server";
import { AuthJwtTokens } from "@/config/auth.config";
import { apiRequest, deleteAuthJwtTokens, refreshTokens, setAuthJwtTokens } from "@/auth";
import { API_URL } from "@/config/env.config";
import { cookies } from "next/headers";

async function handler(request: NextRequest) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(AuthJwtTokens.AccessToken);
    const refreshToken = cookieStore.get(AuthJwtTokens.RefreshToken);

    const url = new URL(request.nextUrl.pathname, API_URL);
    request.nextUrl.searchParams.forEach((value, key) => {
        url.searchParams.append(key, value);
    });

    try {
        const response = await apiRequest(url, request, accessToken?.value);

        if(response.status === 401 && refreshToken) {
            const tokensResponse = await refreshTokens(request, refreshToken.value);

            if(!tokensResponse) {
                const response = new NextResponse(null, { status: 401 });
                deleteAuthJwtTokens(response);
                return response;
            }

            const response = await apiRequest(url, request, accessToken?.value);

            const finalResponse = new NextResponse(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
            });

            setAuthJwtTokens(finalResponse, tokensResponse);
            console.log(finalResponse);
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