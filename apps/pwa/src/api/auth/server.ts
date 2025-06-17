import { withFetcherCache } from "@/lib/fetcher/cache";

import * as GetSession from "./get-session";
import * as GetGoogleOAuthLink from "./get-google-oauth-link";

export const getSession = withFetcherCache(
    GetSession.getSession,
    GetSession.GetSession.queryKey,
);

export const getGoogleOAuthLink = withFetcherCache(
    GetGoogleOAuthLink.getGoogleOAuthLink,
    GetGoogleOAuthLink.GetGoogleOAuthLink.queryKey,
);