import { FetcherInitDefaults, FetcherRequestConfig, FetcherResponse, IFetcher } from "./types";

export class Fetcher implements IFetcher {
    private readonly defaults: FetcherInitDefaults;

    constructor(defaults: FetcherInitDefaults) {
        this.defaults = defaults;
    }

    async get<Output = any, Params = any>(url: string, config: FetcherRequestConfig<Output, Params> = {}): Promise<FetcherResponse<Output>> {
        const response = await fetch(this.defaults.baseURL + url, {
            ...this.defaults,
            ...config,
            method: "GET",
        });

        const data = await this.parseResponse<Output>(response);

        return { data, ...response };
    }

    async post<Input = any, Output = any, Params = any>(url: string, input: Input, config: FetcherRequestConfig<Output, Params>): Promise<FetcherResponse<Output>> {
        const response = await fetch(this.defaults.baseURL + url, {
            ...this.defaults,
            ...config,
            body: JSON.stringify(input),
            method: "POST",
        });

        const data = await this.parseResponse<Output>(response);

        return { data, ...response };
    }

    private async parseResponse<Output>(response: Response): Promise<Output | null> {
        return response.ok ? await response.json() as Output : null;
    }
}