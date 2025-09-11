export interface FetcherResponse<TOutput = any> {
    data: TOutput | null;
    url: string;
    ok: boolean;
    status: number;
    statusText: string;
    headers: Headers;
    type: ResponseType;
    redirected: boolean;
}

export interface FetcherErrorResponse extends Error {
    code?: string;
}