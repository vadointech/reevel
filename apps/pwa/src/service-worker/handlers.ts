import { CacheService } from "@/service-worker/cache/cache.service";
import { Context } from "@/service-worker/context";

export async function precacheStaticAssets(ctx: Context, assets: string[]) {
    if (!ctx.cacheEnabled) return [];

    const cacheService = new CacheService(ctx);

    return cacheService.precacheStatic(assets);
}