import { QueryClient } from "@tanstack/react-query";

import { LocationSearchScreen } from "@/components/screens/location-search";
import { GetBatchLocationByNameQueryBuilder } from "@/features/location/search/queries";

import { Locale } from "@/types/common";

const cities = [
    "Вінниця", "Дніпро", "Донецьк", "Житомир", "Запоріжжя", "Івано-Франківськ",
    "Київ", "Кропивницький", "Луганськ", "Луцьк", "Львів", "Миколаїв",
    "Одеса", "Полтава", "Рівне", "Суми", "Тернопіль", "Ужгород",
    "Харків", "Херсон", "Хмельницький", "Черкаси", "Чернівці", "Чернігів",
];

export namespace OnboardingLocationPickerPage {
    export type Props = {
        locale: Locale
    };
}

export async function OnboardingLocationPickerPage() {
    const queryClient = new QueryClient();

    const places = await queryClient.fetchQuery(
        GetBatchLocationByNameQueryBuilder({
            accessToken: process.env.MAPBOX_SECRET_ACCESS_TOKEN!,
            request: cities.map(item => ({
                q: item,
                limit: 1,
                types: "place",
                country: "ua",
                language: "uk",
            })),
        }),
    );

    return (
        <LocationSearchScreen initialResults={places} />
    );
}
