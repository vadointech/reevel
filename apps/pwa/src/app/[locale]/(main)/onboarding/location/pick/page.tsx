import { OnboardingLocationPicker, OnboardingLocationPickerHeader } from "../_components";
import { getPlaceByName } from "@/api/mapbox/get-place-by-name";
import { ParamsWithLocale } from "@/types/common";
import { MapboxFeatureResponse } from "@/api/mapbox/types";
import { mapboxFeatureResponseTransformer } from "@/features/mapbox";

import styles from "./styles.module.scss";

const cities = [
    "Вінниця", "Дніпро", "Донецьк", "Житомир", "Запоріжжя", "Івано-Франківськ",
    "Київ", "Кропивницький", "Луганськ", "Луцьк", "Львів", "Миколаїв",
    "Одеса", "Полтава", "Рівне", "Суми", "Тернопіль", "Ужгород",
    "Харків", "Херсон", "Хмельницький", "Черкаси", "Чернівці", "Чернігів",
];

export default async function Page({ params }: ParamsWithLocale) {
    const { locale } = await params;

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
            <OnboardingLocationPicker data={data} />
        </div>
    );
}