import {
    FetcherInput,
    FetcherOutput,
    FetcherRequestParams,
    FetcherRequest,
} from "./request";
import { FetcherResponse } from "./response";

export interface IFetcher {
    get<TInput extends FetcherInput, TOutput extends FetcherOutput, TParams extends FetcherRequestParams>
    (url: string, config?: Partial<FetcherRequest<TInput, TParams>>): Promise<FetcherResponse<TOutput>>
    post<TInput extends FetcherInput, TOutput extends FetcherOutput, TParams extends FetcherRequestParams>
    (url: string, config?: Partial<FetcherRequest<TInput, TParams>>): Promise<FetcherResponse<TOutput>>
    patch<TInput extends FetcherInput, TOutput extends FetcherOutput, TParams extends FetcherRequestParams>
    (url: string, config?: Partial<FetcherRequest<TInput, TParams>>): Promise<FetcherResponse<TOutput>>
    delete<TInput extends FetcherInput, TOutput extends FetcherOutput, TParams extends FetcherRequestParams>
    (url: string, config?: Partial<FetcherRequest<TInput, TParams>>): Promise<FetcherResponse<TOutput>>
}