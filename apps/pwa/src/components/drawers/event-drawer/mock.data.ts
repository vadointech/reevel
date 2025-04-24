import { Event } from "@/entities/event";


export const sampleEvent: Event = {
    id: "evt-123",
    title: "Summer Music Festival",
    description: "Join us for a day of amazing music performances featuring local and international artists!",
    poster: "http://localhost:3000/assets/temp/valentine.png",
    primaryColor: "#3b82f6",
    location: {
        type: "Feature",
        properties: {
            id: "loc-1",
            name: "Central Park"
        },
        geometry: {
            type: "Point",
            coordinates: [30.5241, 50.4501]
        },
    },
    ticketsAvailable: 250,
    ticketPrice: 25,
    visibility: "PUBLIC",
    dateTime: "2025-06-15T18:00:00Z",
    hosts:
    {
        id: "user-1",
        userId: "auth-user-1",
        fullName: "Alex Johnson",
        bio: "Event organizer with 5+ years of experience",
        picture: "http://localhost:3000/assets/temp/avatar.png",
        completed: "true",
        interests: []
    },
    interests: [
        {
            slug: "music",
            title_en: "Music",
            title_uk: "Музика",
            icon: "🎧",
            primaryColor: "#6366f1",
            secondaryColor: "#e0e7ff",
            categoryId: "cat-1"
        },
        {
            slug: "boxing",
            title_en: "Boxing",
            title_uk: "Бокс",
            icon: "🥊",
            primaryColor: "#10b981",
            secondaryColor: "#d1fae5",
            categoryId: "cat-2"
        },
        {
            slug: "shopping",
            title_en: "Shopping",
            title_uk: "Шопінг",
            icon: "🛍️",
            primaryColor: "#10b981",
            secondaryColor: "#d1fae5",
            categoryId: "cat-3"
        },
        {
            slug: "astronomy",
            title_en: "Astronomy",
            title_uk: "Асторономія",
            icon: "🔭",
            primaryColor: "#6366f1",
            secondaryColor: "#e0e7ff",
            categoryId: "cat-4"
        },
    ],
    tickets: [
        {
            id: "ticket-1",
            eventId: "evt-123",
            userId: "user-2",
            paymentId: "pay-1",
            event: {} as any,
            user: {
                id: "user-2",
                userId: "auth-user-2",
                fullName: "Maria Garcia",
                picture: "/api/placeholder/32/32",
                completed: "true"
            }
        }
    ]
};