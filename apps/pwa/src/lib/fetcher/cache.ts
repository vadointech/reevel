import { FetcherRequestConfig, FetcherCacheConfig, IFetcherCacheManager } from "./types";

export class FetcherCacheManager implements IFetcherCacheManager {
    private readonly config: FetcherCacheConfig;
    constructor(config: Partial<FetcherCacheConfig> = {}) {
        this.config = config;
    }

    newRequestCacheKey(request: Partial<FetcherRequestConfig>, queryKey: string[]): string[] {
        const keyParts = [...queryKey];
        let sid: string | undefined;

        if(request.nextHeaders) {
            const cookies = request.nextHeaders.get("cookie");
            if(cookies && this.config.userAwareKey) {
                const key = this.getCookieValue(cookies, this.config.userAwareKey);
                if(key) sid = key;
            }
        }

        if(sid) return FetcherCacheManager.newCacheTag(keyParts, { id: sid });
        return FetcherCacheManager.newCacheTag(keyParts);
    }

    static newCacheTag<S extends { id: string }>(tags: string[] = [], session?: S): string[] {
        const keyParts: string[] = [];

        if(session) {
            for(const tag of tags) {
                keyParts.push(`${session.id}/${tag}`);
            }
        } else {
            for(const tag of tags) {
                keyParts.push(tag);
            }
        }

        return keyParts;
    }

    private getCookieValue(cookies: string, key: string): string | undefined {
        const tokens = cookies.split("; ");

        for(const token of tokens) {
            const [name, value] = token.split("=");
            if(name === key) return decodeURIComponent(value).replace(/^"|"$/g, "");
        }
    }
}