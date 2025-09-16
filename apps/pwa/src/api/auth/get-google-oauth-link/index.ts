import { fetcherClient } from "@/api/client";

export namespace GetGoogleOAuthLink {
    export type TInput = null;
    export type TOutput = {
        link: string;
    };

    export const queryKey = ["auth/google/oauth"];
}

export const getGoogleOAuthLink = fetcherClient.fetch<GetGoogleOAuthLink.TInput, GetGoogleOAuthLink.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/auth/google", input);
    },
});