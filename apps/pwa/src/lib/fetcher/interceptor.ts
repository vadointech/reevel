import {
    FetcherRequestInterceptor,
    FetcherResponseInterceptor,
    IFetcherInterceptor,
} from "./types/interceptor";

export class FetcherInterceptor implements IFetcherInterceptor {
    requestInterceptorsChain: FetcherRequestInterceptor[] = [];
    responseInterceptorsChain: FetcherResponseInterceptor[] = [];

    request(interceptor: FetcherRequestInterceptor) {
        this.requestInterceptorsChain.push(interceptor);
    }

    response(interceptor: FetcherResponseInterceptor) {
        this.responseInterceptorsChain.push(interceptor);
    }
}