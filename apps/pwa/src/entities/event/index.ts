import { UserProfileEntity } from "../profile";
import { InterestEntity } from "../interests";
import { PointGeometry } from "@/components/shared/map/types/point/point";

export enum EventVisibility {
    HOST = "HOST",
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
}

export type EventEntity = {
    id: string;
    title: string;
    description: string;
    poster: string;
    primaryColor: string;
    location?: PointGeometry;
    ticketsAvailable?: number;
    ticketPrice?: number;
    visibility: EventVisibility;
    dateTime: Date;
    host: UserProfileEntity;
    interests: InterestEntity[];
    tickets: EventTicketEntity[];
    attendees: UserProfileEntity[];
};

export type EventTicketEntity = {
    id: string;
    eventId: string;
    userId: string;
    paymentId?: string;
    event: Event; // або Partial<Event>, якщо не завжди передаєш повністю
    user: UserProfileEntity;   // залежить від структури UserEntity
};
