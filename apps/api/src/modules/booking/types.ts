import { EventsEntity } from "@/modules/event/entities/events.entity";
import { MonobankApi } from "@/modules/payment/monobank/types";
import { EventTicketsEntity } from "@/modules/event/entities/event-tickets.entity";

export type ReserveTicketResponse = {
    event: EventsEntity;
    ticket: EventTicketsEntity
    invoice?: MonobankApi.InvoiceResponse
};