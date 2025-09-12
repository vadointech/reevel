import { IFetcher } from "./types/fetcher";
import { FetcherInput, FetcherOutput, FetcherRequest, FetcherRequestParams } from "./types/request";
import { FetcherResponse } from "./types/response";

export class Fetcher implements IFetcher {
    constructor(
        private readonly defaults: FetcherRequest,
    ) {}

    get<TInput extends FetcherInput = null, TOutput extends FetcherOutput = null, TParams extends FetcherRequestParams = null>(url: string, config: FetcherRequest<TInput, TParams>): Promise<FetcherResponse<TOutput>> {
        return this.request<TInput, TOutput, TParams>(url, {
            ...config,
            method: "GET",
        });
    }

    post<TInput extends FetcherInput = null, TOutput extends FetcherOutput = null, TParams extends FetcherRequestParams = null>(url: string, config: FetcherRequest<TInput, TParams>): Promise<FetcherResponse<TOutput>> {
        return this.request<TInput, TOutput, TParams>(url, {
            ...config,
            method: "POST",
        });
    }

    patch<TInput extends FetcherInput = null, TOutput extends FetcherOutput = null, TParams extends FetcherRequestParams = null>(url: string, config: FetcherRequest<TInput, TParams>): Promise<FetcherResponse<TOutput>> {
        return this.request<TInput, TOutput, TParams>(url, {
            ...config,
            method: "PATCH",
        });
    }

    delete<TInput extends FetcherInput = null, TOutput extends FetcherOutput = null, TParams extends FetcherRequestParams = null>(url: string, config: FetcherRequest<TInput, TParams>): Promise<FetcherResponse<TOutput>> {
        return this.request<TInput, TOutput, TParams>(url, {
            ...config,
            method: "DELETE",
        });
    }

    private async request<TInput, TOutput, TParams>(
        url: string,
        config: FetcherRequest<TInput, TParams>,
    ): Promise<FetcherResponse<TOutput>> {
        const {
            // Omit
            baseURL = this.defaults.baseURL,
            nextHeaders,
            params,
            fallback = null,

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

        try {
            const response = await fetch(fullURL.toString(), requestOptions);
            return this.parseResponse(response, fallback);
        } catch(error) {
            return {
                url,
                data: fallback,
                ok: false,
                status: 0,
                statusText: error instanceof Error ? error.message : "Network Error",
                redirected: false,
            };
        }
    }


    private async parseResponse<TOutput>(response: Response, fallback: TOutput | null): Promise<FetcherResponse<TOutput>> {
        const fetcherResponse: FetcherResponse<TOutput> = {
            data: fallback,
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