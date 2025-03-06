import { fetcherClient } from "@/api/fetcher-client";

export namespace GetGoogleOAuthLink {
    export type TInput = null;
    export type TOutput = {
        link: string;
    };
}

export const getGoogleOAuthLink = fetcherClient<GetGoogleOAuthLink.TInput, GetGoogleOAuthLink.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/auth/google", input);
    },
});