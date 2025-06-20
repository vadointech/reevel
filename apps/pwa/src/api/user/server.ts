import { fetcherClient } from "@/api/fetcher-client";

import * as GetSession from "./get-session";
import * as GetProfileRequest from "./get-profile";
import * as GetInterestsRequest from "./get-interests";
import * as GetUploadsRequest from "./uploads/get-uploads";

export const getSession = fetcherClient.cache({
    fetchFunc: GetSession.getSession,
    queryKey: GetSession.GetSession.queryKey,
});

export const getCurrentUserProfile = fetcherClient.cache({
    fetchFunc: GetProfileRequest.getCurrentUserProfile,
    queryKey: GetProfileRequest.GetCurrentUserProfile.queryKey,
});

export const getCurrentUserInterests = fetcherClient.cache({
    fetchFunc: GetInterestsRequest.getCurrentUserInterests,
    queryKey: GetInterestsRequest.GetCurrentUserInterests.queryKey,
});

export const getCurrentUserUploads = fetcherClient.cache({
    fetchFunc: GetUploadsRequest.getCurrentUserUploads,
    queryKey: GetUploadsRequest.GetUserUploads.queryKey,
});