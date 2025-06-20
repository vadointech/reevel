import * as GetInitialInterests from "./get-initials";
import { fetcherClient } from "@/api/fetcher-client";

export const getInitialInterests = fetcherClient.persist({
    fetchFunc: GetInitialInterests.getInitialInterests,
    queryKey: GetInitialInterests.GetInitialInterests.queryKey,
});