import { getCities } from "@/api/cities";
import { CitiesEntity } from "@/entities/cities";
import { API_URL } from "@/config/env.config";

export async function getDefaultCity(): Promise<CitiesEntity | undefined> {
    const response= await getCities({
        params: { mapboxId: "dXJuOm1ieHBsYzpBZnVvNlE" },
        baseURL: API_URL,
    });

    if(!response.data) {
        return undefined;
    }

    return response.data.data?.[0];
}