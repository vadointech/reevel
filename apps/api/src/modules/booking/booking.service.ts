import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from "@nestjs/common";
import { DataSource, EntityManager } from "typeorm";

import { PaymentService } from "@/modules/payment/payment.service";

import { EventRepository } from "@/modules/event/repositories/event.repository";
import { EventTicketsRepository } from "../event/repositories/event-tickets.repository";
import { PaymentRepository } from "@/modules/payment/repositories/payment.repository";

import { PaymentStatus, PaymentType } from "@/modules/payment/entities/payment.entity";

import { v4 as uuidv4 } from "uuid";
import { ServerSession } from "@/types";
import { ReserveTicketResponse } from "./types";

@Injectable()
export class BookingService {
    private logger = new Logger(BookingService.name);

    constructor(
        private readonly paymentService: PaymentService,

        private readonly eventRepository: EventRepository,
        private readonly eventTicketsRepository: EventTicketsRepository,
        private readonly paymentRepository: PaymentRepository,

        private readonly dataSource: DataSource,
    ) {}

    async reserveTicket(session: ServerSession, eventId: string): Promise<ReserveTicketResponse> {
        try {
            const [event, ticketCount, userTicket, reclaimedPayment] = await Promise.all([
                this.eventRepository.findOneBy({ id: eventId }),
                this.eventTicketsRepository.countBy({ eventId }),
                this.eventTicketsRepository.exists({ where: { eventId, userId: session.user.id } }),
                this.paymentRepository.findOneBy({ userId: session.user.id, status: PaymentStatus.RECLAIMED }),
            ]);

            if(!event) {
                throw new NotFoundException("Event doesn't exist");
            }

            if(!event.ticketPrice) {
                throw new BadRequestException("Event is free");
            }

            if(event.ticketsAvailable !== null && event.ticketsAvailable !== undefined) {
                if(ticketCount >= event.ticketsAvailable) {
                    throw new BadRequestException("No tickets left");
                }
            }

            if(userTicket) {
                throw new BadRequestException("Ticket already exists");
            }

            if(reclaimedPayment) {
                const ticket = await this.eventTicketsRepository.createAndSave({
                    eventId,
                    paymentId: reclaimedPayment.id,
                    userId: session.user.id,
                });

                return { event, ticket };
            }

            const paymentId = uuidv4();

            const invoice = await this.paymentService.createInvoice(session, {
                paymentId,
                paymentType: PaymentType.BOOKING_FEE,
                ticketPrice: event.ticketPrice,
                ticketCurrency: event.ticketPriceCurrency,
            });

            try {
                const ticket = await this.dataSource.transaction(async entityManager => {
                    await this.paymentRepository.createAndSave({
                        id: paymentId,
                        type: PaymentType.BOOKING_FEE,
                        amount: event.ticketPrice!,
                        userId: session.user.id,
                        invoiceId: invoice.invoiceId,
                        currency: event.ticketPriceCurrency,
                    }, entityManager);

                    return this.eventTicketsRepository.createAndSave({
                        eventId,
                        paymentId,
                        userId: session.user.id,
                    }, entityManager);
                });

                return { event, ticket, invoice };
            } catch(error) {
                await this.paymentService.deleteInvoice(invoice.invoiceId);
                throw error;
            }
        } catch(error) {
            this.logger.error(`Unexpected error booing ticket: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }

    async cancelReservation(eventId: string) {
        try {
            return this.eventTicketsRepository.delete({ eventId });
        } catch {
            return false;
        }
    }

    async reclaimTickets(eventId: string, entityManager?: EntityManager) {
        try {

            /**
             * Updating status for paid tickets
             */
            await this.paymentRepository.query(
                `
                    UPDATE payments
                        SET status = $1
                        WHERE status = $2
                        AND id IN (
                            SELECT "paymentId"
                            FROM event_tickets
                            WHERE "eventId" = $3
                        )
                `,
                [PaymentStatus.RECLAIMED, PaymentStatus.CHARGED, eventId],
                entityManager,
            );

            /**
             * Deleting unpaid tickets
             */
            await this.paymentRepository.query(
                `
                    DELETE FROM payments
                    WHERE status = $1
                        AND id IN (
                            SELECT "paymentId"
                            FROM event_tickets
                            WHERE "eventId" = $2
                        )
                `,
                [PaymentStatus.PENDING, eventId],
                entityManager,
            );
        } catch(error) {
            this.logger.error(`Unexpected error reclaiming ticket: ${error.message}`, error.stack);
            throw new InternalServerErrorException();
        }
    }
}
