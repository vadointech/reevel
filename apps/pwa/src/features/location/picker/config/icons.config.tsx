import { ReactNode } from "react";
import { GooglePLacesApiIncludedTypes } from "@/api/google/places/_internal/included-types.config";
import {
    IconAmusementPark, IconArtGallery, IconBar,
    IconBeach,
    IconBowlingAlley,
    IconCasino, IconCityHall,
    IconCoffeeShop,
    IconFastFoodRestaurant,
    IconGym,
    IconIceCreamShop,
    IconLandmark, IconLibrary,
    IconMovieTheater, IconMuseum, IconNightClub,
    IconPark,
    IconPizzaRestaurant, IconPub,
    IconRamenRestaurant,
    IconRestaurant, IconSchool,
    IconSeafoodRestaurant, IconShoppingMall,
    IconSpa,
    IconStadium,
    IconSushiRestaurant,
    IconTheater,
    IconTouristAttraction,
    IconUniversity,
    IconWater,
    IconYogaStudio, IconZoo, MapPinIcon,
} from "@/components/icons";

export type Icon = {
    icon: ReactNode;
    primaryColor: string;
    secondaryColor: string;
};

export const IncludedTypesMarker: Record<GooglePLacesApiIncludedTypes | "default" | "street_address", Icon> = {
    /**
     * Food_and_drink
     */
    restaurant: {
        icon: <IconRestaurant />,
        primaryColor: "#FF8C00",
        secondaryColor: "#FFD700",
    },
    sushi_restaurant: {
        icon: <IconSushiRestaurant />,
        primaryColor: "#FF8C00",
        secondaryColor: "#FFD700",
    },
    chinese_restaurant: {
        icon: <IconRamenRestaurant />,
        primaryColor: "#FF8C00",
        secondaryColor: "#FFD700",
    },
    seafood_restaurant: {
        icon: <IconSeafoodRestaurant />,
        primaryColor: "#FF8C00",
        secondaryColor: "#FFD700",
    },
    cafe: {
        icon: <IconRestaurant />,
        primaryColor: "#FF8C00",
        secondaryColor: "#FFD700",
    },

    pizza_restaurant: {
        icon: <IconPizzaRestaurant style={{ transform: "translate(1.2px, -1px)"}} />,
        primaryColor: "#FF8C00",
        secondaryColor: "#FFD700",
    },
    fast_food_restaurant: {
        icon: <IconFastFoodRestaurant style={{ transform: "translateY(-1px)"}} />,
        primaryColor: "#FF8C00",
        secondaryColor: "#FFD700",
    },
    brunch_restaurant: {
        icon: <IconFastFoodRestaurant style={{ transform: "translateY(-1px)"}} />,
        primaryColor: "#FF8C00",
        secondaryColor: "#FFD700",
    },
    meal_takeaway: {
        icon: <IconFastFoodRestaurant style={{ transform: "translateY(-1px)"}} />,
        primaryColor: "#FF8C00",
        secondaryColor: "#FFD700",
    },
    steak_house: {
        icon: <IconFastFoodRestaurant style={{ transform: "translateY(-1px)"}} />,
        primaryColor: "#FF8C00",
        secondaryColor: "#FFD700",
    },
    sandwich_shop: {
        icon: <IconFastFoodRestaurant style={{ transform: "translateY(-1px)"}} />,
        primaryColor: "#FF8C00",
        secondaryColor: "#FFD700",
    },


    coffee_shop: {
        icon: <IconCoffeeShop />,
        primaryColor: "#8B4513",
        secondaryColor: "#F4A460",
    },
    ice_cream_shop: {
        icon: <IconIceCreamShop />,
        primaryColor: "#8B4513",
        secondaryColor: "#F4A460",
    },

    /**
     * Education
     */
    school: {
        icon: <IconSchool style={{ transform: "translateY(-1px)"}} />,
        primaryColor: "#704731",
        secondaryColor: "#C4A484",
    },
    university: {
        icon: <IconUniversity />,
        primaryColor: "#704731",
        secondaryColor: "#C4A484",
    },

    /**
     * Green_zones
     */
    park: {
        icon: <IconPark />,
        primaryColor: "#228B22",
        secondaryColor: "#98FB98",
    },
    national_park: {
        icon: <IconPark />,
        primaryColor: "#228B22",
        secondaryColor: "#98FB98",
    },
    hiking_area: {
        icon: <IconPark />,
        primaryColor: "#228B22",
        secondaryColor: "#98FB98",
    },
    garden: {
        icon: <IconPark />,
        primaryColor: "#228B22",
        secondaryColor: "#98FB98",
    },
    botanical_garden: {
        icon: <IconPark />,
        primaryColor: "#228B22",
        secondaryColor: "#98FB98",
    },
    golf_course: {
        icon: <IconPark />,
        primaryColor: "#228B22",
        secondaryColor: "#98FB98",
    },
    stadium: {
        icon: <IconStadium />,
        primaryColor: "#228B22",
        secondaryColor: "#98FB98",
    },

    /**
     * Health_and_fitness
     */
    gym: {
        icon: <IconGym />,
        primaryColor: "#00B7EB",
        secondaryColor: "#87CEEB",
    },
    spa: {
        icon: <IconSpa />,
        primaryColor: "#00B7EB",
        secondaryColor: "#87CEEB",
    },
    yoga_studio: {
        icon: <IconYogaStudio />,
        primaryColor: "#00B7EB",
        secondaryColor: "#87CEEB",
    },
    fitness_center: {
        icon: <IconGym />,
        primaryColor: "#00B7EB",
        secondaryColor: "#87CEEB",
    },
    beach: {
        icon: <IconBeach />,
        primaryColor: "#00B7EB",
        secondaryColor: "#87CEEB",
    },
    aquarium: {
        icon: <IconWater />,
        primaryColor: "#00B7EB",
        secondaryColor: "#87CEEB",
    },
    swimming_pool: {
        icon: <IconWater />,
        primaryColor: "#00B7EB",
        secondaryColor: "#87CEEB",
    },

    /**
     * Culture_and_entertainment
     */
    movie_theater: {
        icon: <IconMovieTheater />,
        primaryColor: "#C71585",
        secondaryColor: "#FF69B4",
    },
    bowling_alley: {
        icon: <IconBowlingAlley style={{ transform: "translateY(.5px)"}} />,
        primaryColor: "#C71585",
        secondaryColor: "#FF69B4",
    },
    amusement_park: {
        icon: <IconAmusementPark style={{ transform: "translateY(.5px)"}} />,
        primaryColor: "#C71585",
        secondaryColor: "#FF69B4",
    },
    amusement_center: {
        icon: <IconAmusementPark style={{ transform: "translateY(.5px)"}} />,
        primaryColor: "#C71585",
        secondaryColor: "#FF69B4",
    },
    performing_arts_theater: {
        icon: <IconTheater style={{ transform: "translateY(.5px)"}} />,
        primaryColor: "#C71585",
        secondaryColor: "#FF69B4",
    },
    zoo: {
        icon: <IconZoo />,
        primaryColor: "#C71585",
        secondaryColor: "#FF69B4",
    },

    cultural_landmark: {
        icon: <IconLandmark />,
        primaryColor: "#800080",
        secondaryColor: "#DDA0DD",
    },
    historical_landmark: {
        icon: <IconLandmark />,
        primaryColor: "#800080",
        secondaryColor: "#DDA0DD",
    },
    tourist_attraction: {
        icon: <IconTouristAttraction />,
        primaryColor: "#800080",
        secondaryColor: "#DDA0DD",
    },

    museum: {
        icon: <IconMuseum style={{ transform: "translateY(-1.5px)"}} />,
        primaryColor: "#4169E1",
        secondaryColor: "#B0C4DE",
    },
    art_gallery: {
        icon: <IconArtGallery />,
        primaryColor: "#4169E1",
        secondaryColor: "#B0C4DE",
    },
    library: {
        icon: <IconLibrary />,
        primaryColor: "#4169E1",
        secondaryColor: "#B0C4DE",
    },

    /**
     * Shopping
     */
    shopping_mall: {
        icon: <IconShoppingMall />,
        primaryColor: "#FF4500",
        secondaryColor: "#FFA500",
    },
    plaza: {
        icon: <IconShoppingMall />,
        primaryColor: "#FF4500",
        secondaryColor: "#FFA500",
    },

    /**
     * Government
     */
    city_hall: {
        icon: <IconCityHall />,
        primaryColor: "#696969",
        secondaryColor: "#A9A9A9",
    },

    /**
     * Bars_and_nightlife
     */
    bar: {
        icon: <IconBar style={{ transform: "translateY(1px)"}} />,
        primaryColor: "#FF8C00",
        secondaryColor: "#FFD700",
    },
    pub: {
        icon: <IconPub />,
        primaryColor: "#FF8C00",
        secondaryColor: "#FFD700",
    },
    night_club: {
        icon: <IconNightClub />,
        primaryColor: "#FF8C00",
        secondaryColor: "#FFD700",
    },
    casino: {
        icon: <IconCasino />,
        primaryColor: "#FF8C00",
        secondaryColor: "#FFD700",
    },

    /**
     * Pin
     */
    street_address: {
        icon: <MapPinIcon style={{ transform: "translateY(0.5px)"}} />,
        primaryColor: "#483D8B",
        secondaryColor: "#9370DB",
    },

    /**
     * Default
     */
    default: {
        icon: <MapPinIcon style={{ transform: "translateY(0.5px)"}} />,
        primaryColor: "#696969",
        secondaryColor: "#A9A9A9",
    },
};