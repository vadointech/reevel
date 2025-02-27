import { action } from "@/lib/action/action";
import { serverFetcher } from "@/api/server";
import { headers } from "next/headers";
import { GetGoogleOAuthLink } from ".";

export const getGoogleOAuthLink = action<GetGoogleOAuthLink.TInput, GetGoogleOAuthLink.TOutput>({
    fetchFn: async({ config }) => {
        return serverFetcher(await headers()).get(GetGoogleOAuthLink.url, config);
    },
});