"use server";

import { serverFetcher } from "@/api/server";
import { headers } from "next/headers";
import { InterestEntity } from "@/entities/interests";

export namespace GetInitialInterests {
    export type TInput = null;
    export type TOutput = InterestEntity[];
}

export async function getInitialInterests() {
    return serverFetcher(await headers()).get<GetInitialInterests.TInput, GetInitialInterests.TOutput>("/interests/initials");
}