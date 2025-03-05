import { clientFetcher } from "@/api/client";

export namespace Logout {
    export type TInput = null;
    export type TOutput = null;
}

export async function logout() {
    return clientFetcher.get<Logout.TInput, Logout.TOutput>("auth//logout");
}