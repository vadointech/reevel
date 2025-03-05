"use server";

import { serverFetcher } from "@/api/server";
import { headers } from "next/headers";

export namespace GetGoogleOAuthLink {
    export type TInput = null;
    export type TOutput = {
        link: string;
    };
}

export async function getGoogleOAuthLink() {
    return serverFetcher(await headers()).get<GetGoogleOAuthLink.TInput, GetGoogleOAuthLink.TOutput>("/auth/google");
};