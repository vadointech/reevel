"use server";

import cache from "next/cache";
import { FetcherCacheManager } from "@/lib/fetcher/cache";
import { UserEntity } from "@/entities/user";

export async function revalidateSessionTag(session: Maybe<UserEntity>, queryKey: string[]) {
    if(!session) return;
    const tags = FetcherCacheManager.newCacheTag(queryKey, session);
    tags.forEach(cache.revalidateTag);
}