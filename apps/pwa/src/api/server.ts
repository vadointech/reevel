import { Fetcher } from "@/lib/fetcher/fetcher";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { getHeadersConfig } from "@/lib/fetcher/utils";

export function serverFetcher(nextHeaders: ReadonlyHeaders){
    const headers = getHeadersConfig(nextHeaders);
    return new Fetcher({
        baseURL: "http://localhost:3001/api",
        credentials: "include",
        headers,
    });
}