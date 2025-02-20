export default {
    accessToken: {
        secret: "super_secret_hash",
        expiresIn: 60 * 10, // 10 min
        cookieKey: "access_token",
    },

    refreshToken: {
        secret: "super_secret_refresh_hash",
        expiresIn: 60 * 60 * 24 * 7, // 1 week
        cookieKey: "refresh_token",
    },
};