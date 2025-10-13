import { FetcherClient } from "@/lib/fetcher/client";
import { BASE_URL } from "@/config/env.config";

export const fetcherClient = new FetcherClient({
    baseURL: BASE_URL + "/api",
    credentials: "include",
});