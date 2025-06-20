import { AuthConfig } from "@/modules/auth/dto/jwt.dto";

export default {
    accessToken: {
        secret: "super_secret_hash",
        expiresIn: 60 * 10, // 10 min
        cookieKey: "access_token",
    },
    refreshToken: {
        secret: "super_secret_refresh_hash",
        expiresIn: 60 * 60 * 24 * 30, // 1 month
        cookieKey: "refresh_token",
    },
    session: {
        secret: "none",
        cookieKey: "session_id",
        expiresIn: 60 * 60 * 24 * 30, // 1 month
    },
} satisfies AuthConfig;