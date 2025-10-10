"use server";

import { getAccessToken } from "@/api/server";

import * as GetEvent from "./get-one";
import * as GetAllEvents from "./get-all";
import * as CreateEvent from "./create";
import * as UploadEventPoster from "./upload-poster";
import * as GetNearbyEvents from "./get-nearby";
import * as GetRandomizedEvents from "./get-randomized";
import * as GetEventCityHighlights from "./get-city-highlights";
import * as GetEventCollectionsFeed from "./get-collections-feed";

export async function getAllEvents() {
    const response = await GetAllEvents.getAllEvents({
        fallback: [],
    });
    return response.data;
}

export async function getEvent(input: GetEvent.GetEvent.TInput) {
    const accessToken = await getAccessToken();

    const response = await GetEvent.getEvent({
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
        body: input,
    });

    return response.data;
}

export async function createEvent(input: CreateEvent.CreateEvent.TInput) {
    const accessToken = await getAccessToken();

    const response = await CreateEvent.createEvent({
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
        body: input,
    });

    return response.data;
}

export async function uploadEventPoster(input: UploadEventPoster.UploadEventPoster.TInput) {
    const accessToken = await getAccessToken();

    const response = await UploadEventPoster.uploadEventPoster({
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
        body: input,
    });

    return response.data;
}


export async function getNearbyEvents(input: GetNearbyEvents.GetNearbyEvents.TParams) {
    const accessToken = await getAccessToken();

    const response = await GetNearbyEvents.getNearbyEvents({
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
        params: input,
        fallback: [],
    });

    return response.data;
}

export async function getRandomizedEvents(input: GetRandomizedEvents.GetRandomizedEvents.TInput) {
    const accessToken = await getAccessToken();

    const response = await GetRandomizedEvents.getRandomizedEvents({
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
        body: input,
        fallback: [],
    });

    return response.data;
}

export async function getEventCityHighlightsCollection(input: GetEventCityHighlights.GetEventCityHighlightsCollection.TInput) {
    const accessToken = await getAccessToken();

    const response = await GetEventCityHighlights.getEventCityHighlightsCollection({
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
        body: input,
        fallback: [],
    });

    return response.data;
}

export async function getEventCollectionsFeed() {
    const accessToken = await getAccessToken();

    const response = await GetEventCollectionsFeed.getEventCollectionsFeed({
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
        fallback: [],
    });

    return response.data;
}