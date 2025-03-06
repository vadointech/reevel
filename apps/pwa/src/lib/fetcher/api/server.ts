import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { Fetcher } from "../fetcher";
import { FetcherRequestConfig } from "../types";

const omitHeaders = ["next-action", "accept", "content-type", "content-length"];

export function createServerFetcher(nextHeaders: ReadonlyHeaders, config: FetcherRequestConfig = {}){
    return new Fetcher({
        ...config,
        headers: Object.fromEntries(nextHeaders.entries().filter(([key]) => !omitHeaders.includes(key))),
    });
}