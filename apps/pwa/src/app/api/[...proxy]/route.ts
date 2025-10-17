import { NextRequest } from "next/server";
import { AuthJwtTokens } from "@/config/auth.config";
import { apiRequest, apiResponse, deleteAuthJwtTokens, refreshTokens, setAuthJwtTokens } from "../utils";
import { API_URL } from "@/config/env.config";
import { cookies } from "next/headers";
import { PropsWithParams } from "@/types/common";

async function handler(request: NextRequest, { params }: PropsWithParams<{ proxy: string[] }>) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(AuthJwtTokens.AccessToken);
    const refreshToken = cookieStore.get(AuthJwtTokens.RefreshToken);

    const { proxy } = await params;

    const pathSegments = proxy.join("/");
    const url = new URL(`${API_URL}/${pathSegments}`);

    request.nextUrl.searchParams.forEach((value, key) => {
        url.searchParams.append(key, value);
    });

    try {
        let response = await apiRequest(url.toString(), request, accessToken?.value);

        if(response.status === 401 && refreshToken) {
            const tokensResponse = await refreshTokens(refreshToken.value);

            if(!tokensResponse) {
                const response = apiResponse(null, { status: 401 });
                deleteAuthJwtTokens(response);
                return response;
            }

            response = await apiRequest(url.toString(), request, tokensResponse.accessToken);

            const finalResponse = apiResponse(response);

            setAuthJwtTokens(finalResponse, tokensResponse);
            return finalResponse;
        }

        return apiResponse(response);
    } catch {
        return apiResponse(null, { status: 500 });
    }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;