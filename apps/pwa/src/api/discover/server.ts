import { getCities } from "@/api/cities";
import { CitiesEntity } from "@/entities/cities";

export async function getDefaultCity(): Promise<CitiesEntity | undefined> {
    const response= await getCities({
        params: { mapboxId: "dXJuOm1ieHBsYzpBZnVvNlE" },
    });

    if(!response.data) {
        return undefined;
    }

    return response.data.data?.[0];
}