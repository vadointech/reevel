import * as GetCityHighlights from "./get-city-highlights";
import { fetcherClient } from "@/api/fetcher-client";

export const getCityHighlights = fetcherClient.cache({
    fetchFunc: GetCityHighlights.getCityHighlights,
    queryKey: GetCityHighlights.GetCityHighlights.queryKey,
});