"use server";

import cache from "next/cache";

export async function revalidateCachedTag(tag: string | string[]) {
    if(Array.isArray(tag)) {
        tag.forEach(cache.revalidateTag);
    } else {
        cache.revalidateTag(tag);
    }
}

export async function revalidateCachedPath(path: string | string[], type?: "layout" | "page") {
    if(Array.isArray(path)) {
        path.forEach(item => cache.revalidatePath(item, type));
    } else {
        cache.revalidatePath(path, type);
    }
}