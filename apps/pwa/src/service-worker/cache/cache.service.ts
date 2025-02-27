import { Context } from "./context";
import { matcher, matches } from "./matcher";

export type CacheParams = {
    cacheName: string;
    ttl?: number;
};

export class CacheService {
    constructor(
        public ctx: Context,
    ) {}

    async addOne(cache: Cache, req: Request, res: Response, params: CacheParams) {
        let response: Response = res;

        if(params.ttl) {
            response =  new Response(res.body, {
                status: res.status,
                statusText: res.statusText,
                headers: new Headers({
                    ...res.headers,
                    ["X-Cached-At"]: new Date().toISOString(),
                }),
            });
        }

        return cache.put(req, response);
    }


    async precacheStatic(assets: string[]): Promise<unknown[]> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const t: Promise<any>[] = matches.map(([_, cache]) => {
            const currentCache = assets.filter(url => matcher(url, cache));
            return caches.open(cache)
                .then(c => c.addAll(
                    currentCache.map(item => encodeURI(item)),
                ));
        });

        return Promise.all(t);
    }

    async invalidateCache(cache: Cache, params: CacheParams) {
        if(!params.ttl) return;

        const now = Date.now();

        if(now - this.ctx.lastInvalidationTime > params.ttl) {
            const keys = await cache.keys();

            for (const request of keys) {
                const response = await cache.match(request);
                if(!response) continue;

                const cacheDate = response.headers.get("X-Cached-At");
                if(!cacheDate) continue;

                const cachedDate = new Date(cacheDate);

                if (now - cachedDate.getTime() > params.ttl) {
                    await cache.delete(request);
                }
            }

            this.ctx.lastInvalidationTime = now;
        }
    }
}