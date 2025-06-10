import { IFetcherResponse } from "./types";
import { init } from "@/lib/init";

export class FetcherResponse<Output = any> implements IFetcherResponse<Output> {
    data: Output | null = null;
    url: string = "";
    ok: boolean = false;
    status: number = 400;
    statusText: string = "Bad Request";
    headers: Headers = new Headers();
    type: ResponseType = "default";
    redirected: boolean = false;

    constructor(params: Partial<FetcherResponse<Output>> = {}) {
        init(this, params);
    }
}