import { QueryClient } from "@tanstack/react-query";

import { LocationSearchScreen } from "@/components/screens/location-search";

import { Locale } from "@/types/common";
import { SearchCityQuery } from "@/features/cities/queries";

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

    const placesPromises = cities.map(item => {
        return queryClient.fetchQuery(
            SearchCityQuery({ q: item, limit: 1 }),
        );
    });

    const places = await Promise.all(placesPromises).then(response => response.flat());

    return (
        <LocationSearchScreen initialResults={places} />
    );
}
