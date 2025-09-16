export const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET;

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

export enum StaticRoutes {
    Root = "/",
    Login = "/login",
    Onboarding = "/onboarding",
}

export const publicRoutes: string[] = [];

export const onboardingStepRoutes: string[] = [
    "/onboarding/photo",
    "/onboarding/bio",
    "/onboarding/interests",
    "/onboarding/location",
    "/onboarding/location/pick",
    "/onboarding/location/confirm",
    StaticRoutes.Root,
];