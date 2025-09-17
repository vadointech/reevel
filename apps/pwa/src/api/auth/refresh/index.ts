import { fetcherClient } from "@/api/client";

export namespace RefreshTokens {
    export type TInput = null;
    export type TOutput = {
        accessToken: string;
        refreshToken: string;
    };
}

export const refreshTokens = fetcherClient.fetch<RefreshTokens.TInput, RefreshTokens.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.post("/auth/refresh", input);
    },
});