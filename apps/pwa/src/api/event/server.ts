import * as GetEvent from "./get-one";
import { fetcherClient } from "@/api/fetcher-client";

export const getEvent = fetcherClient.cache({
    fetchFunc: GetEvent.getEvent,
    queryKey: GetEvent.GetEvent.queryKey,
    cache: {
        revalidate: 1000 * 60 * 60 * 24,
    },
});