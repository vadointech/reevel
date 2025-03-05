"use server";

import { UserProfileEntity } from "@/entities/profile";
import { serverFetcher } from "@/api/server";
import { headers } from "next/headers";

export namespace GetUserProfile {
    export type TInput = null;
    export type TOutput = UserProfileEntity;
}

export async function getUserProfile() {
    return serverFetcher(await headers()).get<null, GetUserProfile.TOutput>("/profile");
}