import { matcher, matches } from "./caches.config";
import { Context } from "@/service-worker/context";

type Options = {
    ttl?: number;
};

export interface ICacheService {
    addOne(cache: Cache, req: Request, res: Response): Promise<void>;
    addAll(assets: string[]): Promise<unknown[]>;
}

export class CacheService implements ICacheService {
    private readonly ttl?: number;

    constructor(
        public ctx: Context,
        options?: Options,
    ) {
        this.ttl = options?.ttl;
    }

    async addOne(cache: Cache, req: Request, res: Response) {
        let response: Response = res;

        if(this.ttl) {
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

    async addAll(assets: string[]): Promise<unknown[]> {
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

    async precacheStatic(assets: string[]): Promise<unknown[]> {
        return this.addAll(
            assets.map(item => encodeURI(item)),
        );
    }

    async invalidateCache(cache: Cache) {
        if(!this.ttl) return;

        const now = Date.now();

        if(now - this.ctx.lastInvalidationTime > this.ttl) {
            const keys = await cache.keys();

            for (const request of keys) {
                const response = await cache.match(request);
                if(!response) continue;

                const cacheDate = response.headers.get("X-Cached-At");
                if(!cacheDate) continue;

                const cachedDate = new Date(cacheDate);

                if (now - cachedDate.getTime() > this.ttl) {
                    await cache.delete(request);
                }
            }

            this.ctx.lastInvalidationTime = now;
        }
    }
}