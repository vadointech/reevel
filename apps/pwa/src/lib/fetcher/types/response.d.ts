export interface IFetcherResponse<Output = any> {
    data: Output | null;
    url: string;
    ok: boolean;
    status: number;
    statusText: string;
    headers: Headers;
    type: ResponseType;
    redirected: boolean;
}