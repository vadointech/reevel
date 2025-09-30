import { PointGeometry } from "@/components/shared/map/types/point/point";
import { UserEntity } from "@/entities/user";
import { InterestEntity } from "../interests";

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
    visibility: EventVisibility;
    locationPoint: PointGeometry;
    locationTitle: string;
    startDate: Date;
    endDate?: Date;

    ticketPrice?: number;
    ticketPriceCurrency?: string;
    ticketsAvailable?: number;

    hosts: EventHostEntity[];
    interests: EventInterestEntity[];
    tickets: EventTicketEntity[];

    createdAt: Date;
    updatedAt?: Date;
};

export type EventHostEntity = {
    eventId: string;
    userId: string;
    user: UserEntity;
};

export type EventInterestEntity = {
    eventId: string;
    interestId: string;
    interest: InterestEntity;
};

export type EventTicketEntity = {
    eventId: string;
    userId: string;
    user: UserEntity;
};

export type EventCollectionEntity = {
    events: EventEntity[];
    interests: InterestEntity[];
};