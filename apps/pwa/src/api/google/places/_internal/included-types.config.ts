/**
 * Represents a constant array of entity types included for use with the Google Places API.
 * These types are organized into specific categories to help in filtering place results based on the desired type of location-badge or establishment.
 *
 * Items in one row will be displayed with the same color and icon.
 *
 * Categories:
 * - Food and Drink
 * - Education
 * - Green Zones
 * - Health and Fitness
 * - Culture and Entertainment
 * - Shopping
 * - Government
 * - Bars and Nightlife
 *
 */
export const GooglePLacesApiIncludedTypes = [
    /**
     * Food_and_drink
     */
    "restaurant",
    "pizza_restaurant",
    "sushi_restaurant",
    "chinese_restaurant",
    "seafood_restaurant",
    "fast_food_restaurant", "brunch_restaurant", "meal_takeaway", "steak_house", "sandwich_shop",
    "cafe", "coffee_shop",
    "ice_cream_shop",

    /**
     * Education
     */
    "university", "school",

    /**
     * Green_zones
     */
    "park", "national_park", "hiking_area", "garden", "botanical_garden",
    "golf_course",
    "stadium",

    /**
     * Health_and_fitness
     */
    "gym", "spa", "yoga_studio", "fitness_center",
    "beach",
    "aquarium",
    "swimming_pool",

    /**
     * Culture_and_entertainment
     */
    "movie_theater",
    "bowling_alley",
    "amusement_park", "amusement_center",
    "tourist_attraction",
    "cultural_landmark",
    "historical_landmark",
    "performing_arts_theater",
    "museum",
    "art_gallery",
    "library",
    "zoo",

    /**
     * Shopping
     */
    "shopping_mall",
    "plaza",

    /**
     * Government
     */
    "city_hall",

    /**
     * Bars_and_nightlife
     */
    "bar",
    "pub",
    "night_club",
    "casino",
] as const;
export type GooglePLacesApiIncludedTypes = typeof GooglePLacesApiIncludedTypes[number];

export const GooglePLacesApiPrimaryIncludedTypes = [
    /**
     * Food_and_drink
     */
    "restaurant",
    "pizza_restaurant",
    "sushi_restaurant",
    "chinese_restaurant",
    "seafood_restaurant",
    "brunch_restaurant", "fast_food_restaurant", "meal_takeaway", "steak_house", "sandwich_shop",
    "cafe", "coffee_shop",
    "ice_cream_shop",

    /**
     * Education
     */
    "university", "school",

    /**
     * Green_zones
     */
    "park", "national_park", "hiking_area", "garden", "botanical_garden",
    "golf_course",
    "stadium",

    /**
     * Health_and_fitness
     */
    "gym", "spa", "yoga_studio", "fitness_center",
    "beach",
    "aquarium",
    "swimming_pool",

    /**
     * Culture_and_entertainment
     */
    "movie_theater",
    "bowling_alley",
    "amusement_park", "amusement_center",
    "tourist_attraction",
    "cultural_landmark",
    "historical_landmark",
    "performing_arts_theater",
    "museum",
    "art_gallery",
    "library",
    "zoo",

    /**
     * Shopping
     */
    "shopping_mall",

    /**
     * Government
     */
    "city_hall",

    /**
     * Bars_and_nightlife
     */
    "bar",
    "pub",
    "night_club",
    "casino",
] as const;
export type GooglePLacesApiPrimaryIncludedTypes = typeof GooglePLacesApiPrimaryIncludedTypes[number];