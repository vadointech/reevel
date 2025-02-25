import { Fetcher } from "@/lib/fetcher/fetcher";

export const clientFetcher = new Fetcher({
    baseURL: "http://localhost:3001/api",
    credentials: "include",
});