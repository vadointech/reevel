export interface FetcherResponse<TOutput> {
    data: TOutput | null;
    url: string;
    ok: boolean;
    status: number;
    statusText: string;
    headers?: Headers;
    type?: ResponseType;
    redirected: boolean;
}

export interface FetcherSafeResponse<TOutput> extends FetcherResponse<TOutput> {
    data: TOutput;
}

export interface FetcherErrorResponse extends Error {
    code?: string;
}