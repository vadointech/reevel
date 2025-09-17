import { FetcherResponse } from "./response";
import { FetcherRequest } from "./request";
import { IFetcher } from "./fetcher";

export interface IFetcherInterceptor {
    request(interceptor: FetcherRequestInterceptor): void;
    response(interceptor: FetcherResponseInterceptor): void;
}

export interface FetcherResponseInterceptor {
    (response: FetcherResponse<any>, request: FetcherRequest, fetcher: IFetcher): FetcherResponse<any> | Promise<FetcherResponse<any>>
}

export interface FetcherRequestInterceptor {
    (request: FetcherRequest, fetcher: IFetcher): FetcherRequest | Promise<FetcherRequest>
}