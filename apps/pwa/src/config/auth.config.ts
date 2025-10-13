import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { API_URL } from "@/config/env.config";

export const REFRESH_TOKEN_URL = API_URL + "/auth/refresh";

export interface IAuthJwtTokens {
    accessToken: string;
    refreshToken: string
}
export interface AuthAccessTokenPayload {
    sub: string;
    email: string;
    completed: number;
    subscription: string;
    locationId: string | undefined;
    locationCoordinates: number[] | undefined;
}

export enum AuthJwtTokens {
    AccessToken = "access_token",
    RefreshToken = "refresh_token",
}

export const authCookiesParams: Partial<ResponseCookie> = {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none",
    domain: process.env.DOMAIN,
};