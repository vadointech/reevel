import { IFetcher } from "./types/fetcher";
import { FetcherInput, FetcherRequest, FetcherRequestParams } from "./types/request";
import { FetcherResponse } from "./types/response";

export class Fetcher implements IFetcher {
    constructor(
        private readonly defaults: FetcherRequest,
    ) {}

    get<TInput extends FetcherInput = null, TOutput = any, TParams extends FetcherRequestParams = null>(url: string, config: FetcherRequest<TInput, TParams>): Promise<FetcherResponse<TOutput>> {
        return this.request<TInput, TOutput, TParams>(url, {
            ...config,
            method: "GET",
        });
    }

    post<TInput extends FetcherInput = null, TOutput = any, TParams extends FetcherRequestParams = null>(url: string, config: FetcherRequest<TInput, TParams>): Promise<FetcherResponse<TOutput>> {
        return this.request<TInput, TOutput, TParams>(url, {
            ...config,
            method: "POST",
        });
    }

    patch<TInput extends FetcherInput = null, TOutput = any, TParams extends FetcherRequestParams = null>(url: string, config: FetcherRequest<TInput, TParams>): Promise<FetcherResponse<TOutput>> {
        return this.request<TInput, TOutput, TParams>(url, {
            ...config,
            method: "PATCH",
        });
    }

    delete<TInput extends FetcherInput = null, TOutput = any, TParams extends FetcherRequestParams = null>(url: string, config: FetcherRequest<TInput, TParams>): Promise<FetcherResponse<TOutput>> {
        return this.request<TInput, TOutput, TParams>(url, {
            ...config,
            method: "DELETE",
        });
    }

    private async request<TInput extends FetcherInput, TOutput, TParams extends FetcherRequestParams>(
        url: string,
        config: FetcherRequest<TInput, TParams>,
    ): Promise<FetcherResponse<TOutput>> {
        const {
            // Omit
            baseURL = this.defaults.baseURL,
            nextHeaders,
            params,

            // Add to request
            body,
            cache = this.defaults.cache,
            credentials = this.defaults.credentials,
            ...requestInit
        } = config;

        // Merge default headers with request-specific headers
        requestInit.headers = {
            ...this.defaults.headers,
            ...requestInit.headers,
            ...Object.fromEntries(nextHeaders?.entries() || []),
        };

        const fullURL = new URL(baseURL + url);

        if(params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    fullURL.searchParams.append(key, String(value));
                }
            });
        }

        const requestOptions: RequestInit = {
            ...requestInit,
            cache: cache?.mode,
            credentials: credentials,
        };

        if (requestInit.method !== "GET" && body !== undefined) {
            if (body instanceof FormData) {
                requestOptions.body = body;
            } else {
                requestInit.headers["Content-Type"] = "application/json";
                requestOptions.body = JSON.stringify(body);
            }
        }

        const response = await fetch(fullURL.toString(), requestOptions);
        return this.parseResponse(response);
    }


    private async parseResponse<TOutput>(response: Response): Promise<FetcherResponse<TOutput>> {
        const fetcherResponse: FetcherResponse<TOutput> = {
            data: null,
            url: response.url,
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            type: response.type,
            redirected: response.redirected,
        };

        if (!response.ok) {
            return fetcherResponse;
            // throw new FetcherError(fetcherResponse);
        }

        const contentType = response.headers.get("Content-Type");

        if (contentType && contentType.includes("application/json")) {
            fetcherResponse.data = await response.json() as TOutput;
        } else {
            // Handle text-area or other response types
            const text = await response.text();
            try {
                fetcherResponse.data = JSON.parse(text) as TOutput;
            } catch {
                fetcherResponse.data = text as unknown as TOutput;
            }
        }

        return fetcherResponse;
    }
}