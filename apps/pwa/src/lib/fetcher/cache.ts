import { unstable_cache } from "next/cache";
import { FetcherFunc, IFetcherRequestConfig } from "@/lib/fetcher/types";

type CacheOptions = {
    revalidate?: number | false;
    tags?: string[];
};

type FetcherFuncInput<Input, Params extends Record<string, any>> = Partial<IFetcherRequestConfig<Input, Params>> & {
    queryKey?: string;
};

function getCookieValue(cookies: string, key: string): string | undefined {
    const tokens = cookies.split("; ");

    for(const token of tokens) {
        const [name, value] = token.split("=");
        if(name === key) return decodeURIComponent(value).replace(/^"|"$/g, "");
    }
}

export function withFetcherCache<Input, Output, Params extends Record<string, any>>(
    fetcherFunc: FetcherFunc<Input, Output, Params>,
    queryKey: string[] = [],
    options: CacheOptions = {},
): FetcherFunc<Input, Output, Params> {
    return (config?: FetcherFuncInput<Input, Params>) => {
        const keyParts = [...queryKey];

        if(config?.params) {
            keyParts.push(JSON.stringify(config.params));
        }

        if(config?.nextHeaders) {
            const cookies = config.nextHeaders.get("cookie");
            if(cookies) {
                const key = getCookieValue(cookies, "session_id");
                if(key) keyParts.push(key);
            }
        }

        const cacheTags = [keyParts.join("/")];

        if(options.tags) {
            cacheTags.push(options.tags.join("/"));
        }

        return unstable_cache(
            () => fetcherFunc(config),
            keyParts, {
                tags: cacheTags,
                revalidate: options.revalidate,
            },
        )();
    };
}