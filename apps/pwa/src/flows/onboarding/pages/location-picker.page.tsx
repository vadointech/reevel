import { getPlaceByName } from "@/api/mapbox/get-place-by-name";
import { MapboxFeatureResponse } from "@/api/mapbox/types";
import { mapboxFeatureResponseTransformer } from "@/features/mapbox";
import { OnboardingLocationPickerHeader, OnboardingLocationPickerSearch } from "../modules/location-picker";
import { Locale } from "@/types/common";

import styles from "../styles/location-picker-page.module.scss";

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

export async function OnboardingLocationPickerPage({ locale }: OnboardingLocationPickerPage.Props) {

    const result = await Promise.all(
        cities.map(name => (
            getPlaceByName({
                body: {
                    name,
                },
                params: {
                    access_token: process.env.MAPBOX_SECRET_ACCESS_TOKEN,
                    language: locale,
                    types: "place",
                    country: "ua",
                    limit: 1,
                },
            })
        )),
    );

    const data: MapboxFeatureResponse[] =
    result.map(item => item.data?.features[0])
        .filter(item => item !== undefined)
        .map(mapboxFeatureResponseTransformer.toLocationList);

    return (
        <div className={styles.page}>
            <OnboardingLocationPickerHeader />
            <OnboardingLocationPickerSearch data={data} />
        </div>
    );
}
