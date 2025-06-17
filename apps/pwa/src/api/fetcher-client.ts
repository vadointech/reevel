import { createFetcherClient } from "@/lib/fetcher/client";

export const fetcherClient = createFetcherClient({
    baseURL: "http://localhost:3001/api",
    credentials: "include",
    cache: "no-store",
});