import { action } from "@/lib/action/action";
import { clientFetcher } from "@/api/client";

export namespace Logout {
    const url = "/auth/logout";

    export type TInput = null;
    export type TOutput = null;

    export const query = action<TInput, TOutput>({
        fetchFn: ({ config }) => {
            return clientFetcher.get(url, config);
        },
    });
}