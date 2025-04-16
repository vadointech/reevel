import {
    FetcherInitDefaults,
    FetcherRequestConfig,
    FetcherResponse,
    IFetcher,
} from "./types";

export class Fetcher implements IFetcher {
    private readonly defaults: FetcherInitDefaults;

    constructor(defaults: FetcherInitDefaults) {
        this.defaults = defaults;
    }

    async get<Input extends null = null, Output = any, Params extends Record<string, any> = object>(url: string, config: FetcherRequestConfig<Input, Params> = {}): Promise<FetcherResponse<Output>> {
        return this.request<Output>(url, {
            ...config,
            method: "GET",
        });
    }

    async post<Input = any, Output = any, Params extends Record<string, any> = object>(url: string, config: FetcherRequestConfig<Input, Params> = {}): Promise<FetcherResponse<Output>> {
        return this.request<Output>(url, {
            ...config,
            method: "POST",
        });
    }

    async patch<Input = any, Output = any, Params extends Record<string, any> = object>(url: string, config: FetcherRequestConfig<Input, Params> = {}): Promise<FetcherResponse<Output>> {
        return this.request<Output>(url, {
            ...config,
            method: "PATCH",
        });
    }

    private async request<Output = any>(
        url: string,
        config: FetcherRequestConfig = {},
    ): Promise<FetcherResponse<Output>> {
        const {
            method = "GET",
            headers = {},
            nextHeaders,
            params = {},
            body,
            baseURL = this.defaults.baseURL || "",
            credentials = this.defaults.credentials,
            next = this.defaults.next,
            cache = this.defaults.cache,
        } = config;

        // Merge default headers with request-specific headers
        const mergedHeaders = {
            ...this.defaults.headers,
            ...headers,
            ...Object.fromEntries(nextHeaders?.entries() || []),
        };

        const fullURL = new URL(baseURL + url);

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                fullURL.searchParams.append(key, String(value));
            }
        });

        const requestOptions: RequestInit = {
            method,
            headers: mergedHeaders,
            credentials,
            next,
            cache,
        };

        if (method !== "GET" && body !== undefined) {
            if (typeof body === "string" || body instanceof FormData) {
                requestOptions.body = body;
            } else {
                mergedHeaders["Content-Type"] = "application/json";
                requestOptions.body = JSON.stringify(body);
            }
        }

        const response = await fetch(fullURL.toString(), requestOptions);
        return this.parseResponse(response);
    }


    private async parseResponse<Output>(response: Response): Promise<FetcherResponse<Output>> {
        const fetcherResponse: FetcherResponse<Output> = {
            data: null,
            url: response.url,
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            type: response.type,
            redirected: response.redirected,
        };

        if (!response.ok) return fetcherResponse;

        const contentType = response.headers.get("Content-Type");

        if (contentType && contentType.includes("application/json")) {
            fetcherResponse.data = await response.json() as Output;
        } else {
            // Handle text or other response types
            const text = await response.text();
            try {
                fetcherResponse.data = JSON.parse(text) as Output;
            } catch {
                fetcherResponse.data = text as unknown as Output;
            }
        }

        // return fetcherResponse;
        return { data: null }
    }
}