import { EventEntity } from "@/entities/event";
import { Event } from "schema-dts";
import { BASE_URL } from "@/config/env.config";

export function getEventJsonLdSchema(event: EventEntity): Event {
    const startDate = new Date(event.startDate);
    const endDate = event.endDate ? new Date(event.endDate) : null;
  
    return {
        "@type": "Event",
        "name": event.title,
        "description": event.description,
        "image": event.poster,
        "url": `${BASE_URL}/discover/event/${event.id}`,
        "startDate": startDate.toISOString(),
        ...(endDate ? { "endDate": endDate.toISOString() } : {}),

        "location": {
            "@type": "Place",
            "name": event.locationTitle,
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": event.locationPoint.coordinates[1],
                "longitude": event.locationPoint.coordinates[0],
            },
        },

        ...(event.ticketPrice ? {
            "offers": {
                "@type": "Offer",
                "price": event.ticketPrice.toString(),
                "priceCurrency": event.ticketPriceCurrency,
                "url": `${BASE_URL}/discover/event/${event.id}`,
                "availability": (event.ticketsAvailable && event.ticketsAvailable > 0) ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
            },
        } : {}),

        ...(event.hosts && event.hosts.length > 0 && {
            "organizer": event.hosts.map(host => ({
                "@type": "Person",
                "name": host.user.profile.fullName,
            })),
        }),

        "keywords": event.interests.map(i => i.interest.title_en).join(", "),
    };
}