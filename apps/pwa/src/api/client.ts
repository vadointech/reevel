import { FetcherClient } from "@/lib/fetcher/client";

export const fetcherClient = new FetcherClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
});