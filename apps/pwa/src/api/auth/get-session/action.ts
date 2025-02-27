import { action } from "@/lib/action/action";
import { GetSession } from "./index";
import { serverFetcher } from "@/api/server";
import { headers } from "next/headers";

export const getSessionRequest = action<GetSession.TInput, GetSession.TOutput>({
    fetchFn: async({ config }) => {
        return serverFetcher(await headers()).get(GetSession.url, config);
    },
});