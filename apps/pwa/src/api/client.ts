import { FetcherClient } from "@/lib/fetcher/client";

export const fetcherClient = new FetcherClient({
    baseURL: process.env.API_URL,
    credentials: "include",
});