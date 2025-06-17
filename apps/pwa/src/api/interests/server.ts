import { withFetcherCache } from "@/lib/fetcher/cache";
import * as GetInitialInterests from "./get-initials";

export const getInitialInterests = withFetcherCache(
    GetInitialInterests.getInitialInterests,
    GetInitialInterests.GetInitialInterests.queryKey,
);