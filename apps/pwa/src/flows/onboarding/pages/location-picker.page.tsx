import { LocationSearchScreen } from "@/components/screens/location-search";

import { Locale } from "@/types/common";
import { searchCity } from "@/api/cities";
import { API_URL } from "@/config/env.config";

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
    const placesPromises = cities.map(item => {
        return searchCity({
            params: { q: item, limit: 1 },
            fallback: [],
            baseURL: API_URL,
        }).then(response => response.data);
    });

    const places = await Promise.all(placesPromises).then(response => response.flat());

    return (
        <LocationSearchScreen initialResults={places} />
    );
}
