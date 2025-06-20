import { fetcherClient } from "@/api/fetcher-client";
import * as GetGoogleOAuthLink from "./get-google-oauth-link";

export const getGoogleOAuthLink = fetcherClient.cache({
    fetchFunc: GetGoogleOAuthLink.getGoogleOAuthLink,
    queryKey: GetGoogleOAuthLink.GetGoogleOAuthLink.queryKey,
});