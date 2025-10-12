import { getCities } from "@/api/cities";
import { CitiesEntity } from "@/entities/cities";

export async function getDefaultCity(): Promise<CitiesEntity | null> {
    const response= await getCities({
        params: { mapboxId: "dXJuOm1ieHBsYzpBZnVvNlE" },
    });

    if(!response.data) {
        return null;
    }

    return response.data.data[0];
}