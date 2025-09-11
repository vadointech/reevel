import { UserEntity } from "@/entities/user";
import { fetcherClient } from "@/api/fetcher-client";

export namespace GetSession {
    export type TInput = null;
    export type TOutput = UserEntity;

    export const queryKey = ["user/session"];

    export const fallback: TOutput = {
        id: "",
        email: "",
        profile: {
            id: "",
            userId: "",
            completed: "",
        },
    };
}

export const getSession = fetcherClient.fetch<GetSession.TInput, GetSession.TOutput>({
    fetcherFunc: async(fetcher, input) => {
        return await fetcher.get("/users/me", input);
    },
});