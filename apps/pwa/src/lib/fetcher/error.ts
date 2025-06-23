import { IFetcherResponse } from "./types";

export class FetcherError extends Error {
    constructor(
        public readonly response: IFetcherResponse,
    ) {
        super(response.statusText);
    }
}