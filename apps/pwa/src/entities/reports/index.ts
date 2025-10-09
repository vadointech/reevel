import { EventEntity } from "@/entities/event";

export enum ReportType {
    INCORRECT_DETAILS = "INCORRECT_DETAILS",
    FRAUDULENT_ACTIVITY = "FRAUDULENT_ACTIVITY",
    INAPPROPRIATE_CONTENT = "INAPPROPRIATE_CONTENT",
    SPAM = "SPAM",
    OTHER = "OTHER",
}

export type ReportsEntity = {
    id: number
    type: ReportType
    description: string
    eventId?: string;
    event?: EventEntity;
};