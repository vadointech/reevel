"use server";

import { UserEntity } from "@/entities/user";
import { serverFetcher } from "@/api/server";
import { headers } from "next/headers";

export namespace GetSession {
    export type TInput = null;
    export type TOutput = UserEntity;
}

export async function getSession() {
    return serverFetcher(await headers()).get<GetSession.TInput, GetSession.TOutput>("/users/me");
}