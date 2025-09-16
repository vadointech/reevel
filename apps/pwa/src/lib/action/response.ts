import { IActionResponse } from "./types";

export class ActionResponse {
    static Success<TOutput>(data: TOutput | string = "OK", init: Partial<Omit<IActionResponse<TOutput>, "data">> = {}): IActionResponse<TOutput | string> {
        return {
            data,
            ok: true,
            statusText: "OK",
            ...init,
        };
    }

    static Error<TOutput>(init: Partial<Omit<IActionResponse<TOutput>, "data">> = {}): IActionResponse<TOutput | null> {
        return {
            data: null,
            ok: false,
            statusText: "Error",
            ...init,
        };
    }
}