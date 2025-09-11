import { fetcherClient } from "@/api/fetcher-client";

export namespace Logout {
    export type TInput = null;
    export type TOutput = null;
}

export const logout = fetcherClient.fetch<Logout.TInput, Logout.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/auth/logout", input);
    },
});