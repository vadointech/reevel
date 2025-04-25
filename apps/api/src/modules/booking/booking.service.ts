import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from "@nestjs/common";
import { Session } from "@/types";

import { DataSource, EntityManager } from "typeorm";
import { PaymentStatus, PaymentType, SupportedCurrencies } from "@/modules/payment/entities/payment.entity";
import { EventRepository } from "@/modules/event/repositories/event.repository";
import { EventTicketsRepository } from "../event/repositories/event-tickets.repository";
import { PaymentService } from "@/modules/payment/payment.service";
import { ReserveTicketResponse } from "@/modules/booking/types";
import { OnEvent } from "@nestjs/event-emitter";
import { PaymentEmitterEvents } from "@/modules/payment/payment.emitter";
import { PaymentRepository } from "@/modules/payment/repositories/payment.repository";
import { EventTicketsEntity } from "@/modules/event/entities/event-tickets.entity";

@Injectable()
export class BookingService {
    private logger = new Logger(BookingService.name);

    constructor(
        private readonly paymentService: PaymentService,

        private readonly eventTicketsRepository: EventTicketsRepository,
        private readonly eventRepository: EventRepository,
        private readonly paymentRepository: PaymentRepository,

        private readonly dataSource: DataSource,
    ) {}

    async reserveTicket(session: Session, eventId: string): Promise<ReserveTicketResponse> {
        try {
            const event = await this.eventRepository.getByID(eventId);
            if(!event) {
                throw new NotFoundException("Event doesn't exist");
            }

            if(!event.ticketPrice) {
                throw new BadRequestException("Event is free");
            }

            if(event.ticketsAvailable !== null && event.ticketsAvailable !== undefined) {
                if(event.ticketsAvailable === 0) {
                    throw new BadRequestException("No tickets left");
                }

                const ticketsBooked = await this.eventTicketsRepository.countAvailable(eventId);
                if(ticketsBooked >= event.ticketsAvailable) {
                    throw new BadRequestException("No tickets left");
                }
            }

            const userTicket = await this.eventTicketsRepository.getOneByUserID(session.user.id, eventId);
            if(userTicket) {
                throw new BadRequestException("Ticket already exists");
            }


            const invoice = await this.paymentService.createInvoice(session, {
                amount: event.ticketPrice!,
                ccy: SupportedCurrencies.UAH,
            });

            try {
                const ticket = await this.dataSource.transaction(async entityManager => {
                    const payment = await this.paymentRepository.create({
                        type: PaymentType.BOOKING_FEE,
                        amount: event.ticketPrice!,
                        userId: session.user.id,
                        invoiceId: invoice.invoiceId,
                        currency: SupportedCurrencies.EUR,
                    });

                    return await this.eventTicketsRepository.create({
                        eventId,
                        userId: session.user.id,
                        paymentId: payment.id,
                    }, entityManager);
                });

                return {
                    event,
                    ticket,
                    invoice,
                };
            } catch(error) {
                await this.paymentService.deleteInvoice(invoice.invoiceId);
                throw error;
            }
        } catch(error) {
            this.logger.error(`Unexpected error booing ticket: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }

    @OnEvent(PaymentEmitterEvents.PaymentSuccess.name)
    async bookTicket(payload: PaymentEmitterEvents.PaymentSuccess.Payload) {
        await this.paymentService.chargeFunds(payload);
    }

    @OnEvent(PaymentEmitterEvents.PaymentFailure.name)
    async releaseTicketByInvoice(payload: PaymentEmitterEvents.PaymentFailure.Payload): Promise<boolean> {
        try {
            const ticket = await this.eventTicketsRepository.getOneByInvoiceID(payload.invoiceId);

            if(!ticket) {
                throw new BadRequestException("Ticket doesn't exist");
            }

            return this.releaseTicket(ticket);
        } catch(error) {
            this.logger.error(`Unexpected error releasing ticket: ${error.message}`, error.stack);
            return false;
        }
    }

    async releaseTicket(ticket: EventTicketsEntity): Promise<boolean> {
        try {
            await this.dataSource.transaction(async entityManager => {
                await this.eventTicketsRepository.deleteByID(ticket.id, entityManager);
                if(ticket.paymentId) {
                    await this.paymentRepository.deleteByID(ticket.paymentId, entityManager);
                }
            });
            return true;
        } catch(error) {
            this.logger.error(`Unexpected error releasing ticket: ${error.message}`, error.stack);
            return false;
        }
    }

    async reclaimTickets(eventId: string, entityManager: EntityManager) {
        try {
            const tickets = await this.eventTicketsRepository.getByEventID(eventId, entityManager);

            const reclaimPromises = tickets.map(ticket => {
                if(!ticket.payment) return;
                const { payment } = ticket;
                if(payment.status === PaymentStatus.PENDING) {
                    // return this.paymentRepository.delete(payment.id, entityManager);
                }

                if(payment.status === PaymentStatus.CHARGED) {
                    // this.paymentRepository.reclaim(payment.id, entityManager);
                }
            });

            await Promise.all(reclaimPromises);
        } catch(error) {
            this.logger.error(`Unexpected error reclaiming ticket: ${error.message}`, error.stack);
            throw new InternalServerErrorException();
        }
    }
}
