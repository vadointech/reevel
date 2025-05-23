import { UserProfileEntity } from "../profile";
import { InterestEntity } from "../interests";
import { Point, BasePoint } from "@/components/shared/map/types/root/point";

export type EventEntity = {
    id: string;
    image?: string;
};

export enum EventVisibility {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
}

export type Event = {
    id: string;
    title: string;
    description: string;
    poster: string;
    primaryColor?: string;
    location?: Point<BasePoint>;
    ticketsAvailable?: number;
    ticketPrice?: number;
    visibility: EventVisibility;
    dateTime: string;
    hosts: UserProfileEntity;
    interests: InterestEntity[];
    tickets: Ticket[];
};

export type Ticket = {
    id: string;
    eventId: string;
    userId: string;
    paymentId?: string;
    event: Event; // або Partial<Event>, якщо не завжди передаєш повністю
    user: UserProfileEntity;   // залежить від структури UserEntity
};
