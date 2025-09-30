import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET;
export const BASE_URL = process.env.NEXT_PUBLIC_URL!;
export const API_URL = process.env.NEXT_PUBLIC_API_URL!;

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

export enum Devices {
    Mobile = "mobile",
    Desktop = "desktop",
    Tablet = "tablet",
    Console = "console",
    SmartTV = "smarttv",
    Wearable = "wearable",
    Embedded = "embedded",
}

export const allowedDevices: Array<string | undefined> = [
    Devices.Mobile,
    Devices.Tablet,
];

export enum StaticRoutes {
    Root = "/",
    Scan = "/scan",
    Login = "/login",
    Onboarding = "/onboarding",
    Discover = "/discover",
}

export const publicRoutes: string[] = [];

export const onboardingStepRoutes: string[] = [
    "/onboarding/photo",
    "/onboarding/bio",
    "/onboarding/interests",
    "/onboarding/location",
    "/onboarding/location/pick",
    "/onboarding/location/confirm",
    StaticRoutes.Discover,
];