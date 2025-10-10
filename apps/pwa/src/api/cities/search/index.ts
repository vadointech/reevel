import { fetcherClient } from "@/api/client";
import { PlaceLocationEntity } from "@/entities/place";

export namespace SearchCity {
    export type TInput = null;
    export type TParams = Partial<{
        lng: number;
        lat: number;
        q: string;
        limit: number;
    }>;
    export type TOutput = PlaceLocationEntity[];
}

export const searchCity = fetcherClient.fetch<SearchCity.TInput, SearchCity.TOutput, SearchCity.TParams>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/cities/search", input);
    },
});