import { InterestEntity, UserInterests } from "@/entities/interests";
import { fetcherClient } from "@/api/fetcher-client";
import { GetSession } from "@/api/auth/get-session";

export namespace GetAllInterest {
    export type TInput = null;

    export type TOutput = InterestEntity[];

    export const queryKey = ["/interests", ...GetSession.queryKey];
}
export const getAllInterest = fetcherClient<GetAllInterest.TInput, GetAllInterest.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get(`/interests`, {
            ...input,
            cache: "force-cache",
            next: {
                tags: GetAllInterest.queryKey,
                revalidate: false,
            },
        });
    },
});