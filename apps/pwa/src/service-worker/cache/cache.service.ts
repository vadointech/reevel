import { ctx } from "./context";
import cacheConfig from "./cache.config";

export type CacheParams = {
    cacheName: string;
    ttl?: number;
    networkTimeout?: number,
};

export class CacheService {
    async addOne(cache: Cache, req: Request, res: Response, params: Partial<CacheParams> = {}) {
        let response: Response = res;

        if(params.ttl) {
            response =  new Response(res.body, {
                status: res.status,
                statusText: res.statusText,
                headers: new Headers({
                    ...res.headers,
                    [ctx.cacheTimestampKey]: new Date().toISOString(),
                }),
            });
        }

        return cache.put(req, response);
    }

    async precacheStatic(assets: string[]): Promise<unknown[]> {
         
        const t = cacheConfig.map(
            async({ cache, validator }) => {
                const currentCache = assets.filter(url => url.match(validator));
                return caches.open(cache)
                    .then(c => c.addAll(
                        currentCache.map(item => encodeURI(item)),
                    ));
            },
        );

        return Promise.all(t);
    }

    async invalidateCache(cache: Cache, params: CacheParams) {
        if(!params.ttl) return;

        const now = Date.now();

        if(now - ctx.lastInvalidationTime > params.ttl) {
            const keys = await cache.keys();

            for (const request of keys) {
                const response = await cache.match(request);
                if(!response) continue;

                const cacheDate = response.headers.get(ctx.cacheTimestampKey);
                if(!cacheDate) continue;

                const cachedDate = new Date(cacheDate);

                if (now - cachedDate.getTime() > params.ttl) {
                    await cache.delete(request);
                }
            }

            ctx.lastInvalidationTime = now;
        }
    }
}

export default new CacheService();