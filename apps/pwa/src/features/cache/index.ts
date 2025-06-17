"use server";

import cache from "next/cache";
import { UserSessionEntity } from "@/entities/session";

export async function revalidateSessionTag(sessions: UserSessionEntity[] | undefined, tags: string[]) {
    if(!sessions) return;
    for(const session of sessions) {
        cache.revalidateTag([...tags, session.id].join("/"));
    }
}