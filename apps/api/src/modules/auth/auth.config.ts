import { AuthConfig } from "@/modules/auth/dto/jwt.dto";

export default {
    accessToken: {
        secret: "super_secret_hash",
        cookieKey: "access_token",
        expiresIn: 60 * 15, // 10 min
    },
    refreshToken: {
        secret: "super_secret_refresh_hash",
        cookieKey: "refresh_token",
        expiresIn: 60 * 60 * 24 * 30, // 1 month
    },
} satisfies AuthConfig;