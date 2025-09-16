import { JWTPayload } from "jose";

export interface JwtRefreshTokenPayload extends JWTPayload {
    sub: string;
}

export interface JwtAccessTokenPayload extends JwtRefreshTokenPayload {
    email: string;
    completed: number;
    subscription: string;
    // TODO: Unsecure !!!
    locationId: string | undefined;
    locationCoordinates: number[] | undefined;
}