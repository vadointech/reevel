export interface IActionResponse<TOutput> {
    data: TOutput;
    ok: boolean;
    statusText: string;
}