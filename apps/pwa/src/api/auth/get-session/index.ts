import { UserEntity } from "@/entities/user";
import { fetcherClient } from "@/api/fetcher-client";

export namespace GetSession {
    export type TInput = null;
    export type TOutput = UserEntity;
}

export const getSession = fetcherClient<GetSession.TInput, GetSession.TOutput>({
    fetcherFunc: async(fetcher, input) => {
        return await fetcher.get("/users/me", input);
    },
});