"use server";

import { serverFetcher } from "@/api/server";
import { headers } from "next/headers";
import { InterestEntity } from "@/entities/interests";

export namespace GetRelatedInterests {
    export type TInput = {
        slug: string;
    };

    export type TOutput = InterestEntity[];
}
export async function getRelatedInterests(input: GetRelatedInterests.TInput) {
    return serverFetcher(await headers()).get<null, GetRelatedInterests.TOutput>(`/interests/related/${input.slug}`);
}