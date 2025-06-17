import { withFetcherCache } from "@/lib/fetcher/cache";

import * as GetProfileRequest from "./get-profile";
import * as GetInterestsRequest from "./get-interests";
import * as GetUploadsRequest from "./uploads/get-uploads";

export const getCurrentUserProfile = withFetcherCache(
    GetProfileRequest.getCurrentUserProfile,
    GetProfileRequest.GetCurrentUserProfile.queryKey,
);

export const getCurrentUserInterests = withFetcherCache(
    GetInterestsRequest.getCurrentUserInterests,
    GetInterestsRequest.GetCurrentUserInterests.queryKey,
);

export const getCurrentUserUploads = withFetcherCache(
    GetUploadsRequest.getCurrentUserUploads,
    GetUploadsRequest.GetUserUploads.queryKey,
);