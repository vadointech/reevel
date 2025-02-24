import { action } from "@/lib/action/action";
import { serverFetcher } from "@/api/server";
import { headers } from "next/headers";
import { GetSession } from "./";

export const getSessionQuery = action<null, GetSession.TOutput>({
    fetchFn: async({ config }) => {
        return serverFetcher(await headers()).get(GetSession.url, config);
    },
});