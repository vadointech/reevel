import { GooglePLacesApiIncludedTypes } from "@/api/google/places/included-types.config";

type DisplayedType = {
    slug: GooglePLacesApiIncludedTypes;
    title_en: string;
    title_uk: string;
    icon: string;
};

export const GooglePLacesApiDisplayedTypes: DisplayedType[] = [
    {
        slug: "park",
        icon: "🌳",
        title_en: "Park",
        title_uk: "Парк",
    },
    {
        slug: "shopping_mall",
        icon: "🛍️",
        title_en: "Shopping Mall",
        title_uk: "Торговий центр",
    },
    {
        slug: "university",
        icon: "🎓",
        title_en: "University",
        title_uk: "Університет",
    },
    {
        slug: "stadium",
        icon: "🏟️",
        title_en: "Stadium",
        title_uk: "Стадіон",
    },
    {
        slug: "cafe",
        icon: "☕",
        title_en: "Cafe",
        title_uk: "Кафе",
    },
    {
        slug: "bar",
        icon: "🍷",
        title_en: "Bar",
        title_uk: "Бар",
    },
    {
        slug: "restaurant",
        icon: "🍽️",
        title_en: "Restaurant",
        title_uk: "Ресторан",
    },
    {
        slug: "tourist_attraction",
        icon: "🗺️",
        title_en: "Tourist Attraction",
        title_uk: "Туристичні місця",
    },
];