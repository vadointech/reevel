import { FetcherResponse } from "./types";

export class FetcherError extends Error {
    constructor(
        public readonly response: FetcherResponse,
    ) {
        super(response.statusText);
    }
}