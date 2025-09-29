import { IFetcher } from "./types/fetcher";
import {
    FetcherInput,
    FetcherOutput,
    FetcherRequest,
    FetcherRequestContentType,
    FetcherRequestParams,
} from "./types/request";
import { FetcherResponse } from "./types/response";
import { FetcherInterceptor } from "@/lib/fetcher/interceptor";

interface InternalRequest<TInput, TParams, TOutput> extends FetcherRequest<TInput, TParams, TOutput> {
    _isInternalCall?: boolean
}

export class Fetcher implements IFetcher {
    private readonly internalFetcher: IFetcher;

    constructor(
        private readonly defaults: FetcherRequest = {},
        private readonly interceptors?: FetcherInterceptor,
    ) {
        this.internalFetcher = {
            get: (url, config) => this.request(url, { ...config, method: "GET", _isInternalCall: true }),
            post: (url, config) => this.request(url, { ...config, method: "POST", _isInternalCall: true }),
            patch: (url, config) => this.request(url, { ...config, method: "PATCH", _isInternalCall: true }),
            delete: (url, config) => this.request(url, { ...config, method: "DELETE", _isInternalCall: true }),
        };
    }

    get<TInput extends FetcherInput = null, TOutput extends FetcherOutput = null, TParams extends FetcherRequestParams = null>(
        url: string,
        config: FetcherRequest<TInput, TParams, TOutput>,
    ): Promise<FetcherResponse<TOutput>> {
        return this.request<TInput, TParams, TOutput>(url, {
            ...config,
            method: "GET",
        });
    }

    post<TInput extends FetcherInput = null, TOutput extends FetcherOutput = null, TParams extends FetcherRequestParams = null>(
        url: string,
        config: FetcherRequest<TInput, TParams, TOutput>,
    ): Promise<FetcherResponse<TOutput>> {
        return this.request<TInput, TParams, TOutput>(url, {
            ...config,
            method: "POST",
        });
    }

    patch<TInput extends FetcherInput = null, TOutput extends FetcherOutput = null, TParams extends FetcherRequestParams = null>(
        url: string,
        config: FetcherRequest<TInput, TParams, TOutput>,
    ): Promise<FetcherResponse<TOutput>> {
        return this.request<TInput, TParams, TOutput>(url, {
            ...config,
            method: "PATCH",
        });
    }

    delete<TInput extends FetcherInput = null, TOutput extends FetcherOutput = null, TParams extends FetcherRequestParams = null>(
        url: string,
        config: FetcherRequest<TInput, TParams, TOutput>,
    ): Promise<FetcherResponse<TOutput>> {
        return this.request<TInput, TParams, TOutput>(url, {
            ...config,
            method: "DELETE",
        });
    }

    private async request<TInput, TParams, TOutput>(
        url: string,
        config: InternalRequest<TInput, TParams, TOutput>,
    ): Promise<FetcherResponse<TOutput>> {
        try {
            let processedConfig = config;

            if(!config._isInternalCall && this.interceptors !== undefined) {
                for(const interceptor of this.interceptors.requestInterceptorsChain) {
                    processedConfig = await interceptor(
                        processedConfig,
                        this.internalFetcher,
                    );
                }
            }

            const {
                // Custom properties (omit from request)
                params,
                authorization,
                nextHeaders,
                fallback = null,
                baseURL = this.defaults.baseURL,
                contentType = FetcherRequestContentType.JSON,

                // Default RequestInit (modify and pass)
                body,
                cache = this.defaults.cache,
                credentials = this.defaults.credentials,

                // Default RequestInit (pass)
                ...requestInit
            } = processedConfig;


            // Merge default headers with request-specific headers
            requestInit.headers = {
                ...this.defaults.headers,
                ...requestInit.headers,
                ...Object.fromEntries(nextHeaders?.entries() || []),
            };

            if(authorization) {
                requestInit.headers["Authorization"] = `${authorization.method} ${authorization.token}`;
            }

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

            if(body !== undefined) {
                if(body instanceof FormData) {
                    requestOptions.body = body;
                } else {
                    requestOptions.body = JSON.stringify(body);
                    requestInit.headers["Content-Type"] = contentType;
                }
            }

            const response = await fetch(fullURL.toString(), requestOptions);

            let fetcherResponse = await this.parseResponse(response, fallback);

            if(!config._isInternalCall && this.interceptors !== undefined) {
                for(const interceptor of this.interceptors.responseInterceptorsChain) {
                    fetcherResponse = await interceptor(
                        fetcherResponse,
                        processedConfig,
                        this.internalFetcher,
                    );
                }
            }

            return fetcherResponse;
        } catch(error) {
            return {
                url,
                data: config.fallback || null,
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

        if (contentType && contentType.includes(FetcherRequestContentType.JSON)) {
            fetcherResponse.data = await response.json() as TOutput;
        } else {
            // Handle text-area or other response types
            const text = await response.text();

            if(text.length === 0) return fetcherResponse;

            try {
                fetcherResponse.data = JSON.parse(text) as TOutput;
            } catch {
                fetcherResponse.data = text as unknown as TOutput;
            }
        }

        return fetcherResponse;
    }
}