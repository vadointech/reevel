import { FetcherClient } from "@/lib/fetcher/client";

export const fetcherClient = new FetcherClient({
    baseURL: "http://localhost:3001/api",
    credentials: "include",
    cache: {
        userAwareKey: "session_id",
    },
});