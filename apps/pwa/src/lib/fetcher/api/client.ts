import { Fetcher } from "../fetcher";
import { FetcherRequestConfig } from "../types";

export function createClientFetcher(config: FetcherRequestConfig = {}) {
    return new Fetcher(config);
}