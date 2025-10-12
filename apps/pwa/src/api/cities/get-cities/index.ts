import { CitiesEntity } from "@/entities/cities";
import { RequestWithPagination, ResponseWithPagination } from "@/types/dtos";
import { fetcherClient } from "@/api/client";

export namespace GetCities {
    export type TInput = null;
    export type TParams = Partial<RequestWithPagination & {
        mapboxId: string;
    }>;
    export type TOutput = ResponseWithPagination<CitiesEntity[]>;
}

export const getCities = fetcherClient.fetch<GetCities.TInput, GetCities.TOutput, GetCities.TParams>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/cities", input);
    },
});