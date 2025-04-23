import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from "@nestjs/common";
import { DataSource, EntityManager } from "typeorm";
import { PaymentsEntity, PaymentStatus, PaymentType } from "@/modules/payment/entities/payment.entity";
import { EventRepository } from "@/modules/event/repositories/event.repository";
import { TicketRepository } from "./repositories/ticket.repository";

import { Session } from "@/types";
import { PaymentRepository } from "@/modules/payment/repositories/payment.repository";

@Injectable()
export class BookingService {
    private logger = new Logger(BookingService.name);

    constructor(
        private readonly ticketRepository: TicketRepository,
        private readonly eventRepository: EventRepository,
        private readonly paymentRepository: PaymentRepository,

        private readonly dataSource: DataSource,
    ) {}

    async bookTicket(session: Session, eventId: string) {
        try {
            const event = await this.eventRepository.getByID(eventId);
            if(!event) {
                throw new NotFoundException("Event doesn't exist");
            }

            if(event.ticketsAvailable !== null && event.ticketsAvailable !== undefined) {
                if(event.ticketsAvailable === 0) {
                    throw new BadRequestException("No tickets left");
                }

                const ticketsCount = await this.ticketRepository.countByEventID(eventId);
                if(ticketsCount === event.ticketsAvailable) {
                    throw new BadRequestException("No tickets left");
                }
            }

            const ticket = await this.ticketRepository.getByUserID(session.user.id, eventId);
            if(ticket) {
                throw new BadRequestException("Ticket already exists");
            }

            return this.dataSource.transaction(async entityManager => {
                let payment: PaymentsEntity | undefined = undefined;

                if(event.ticketPrice) {
                    payment = await this.paymentRepository.create({
                        type: PaymentType.BOOKING_FEE,
                        amount: event.ticketPrice,
                        userId: session.user.id,
                    });
                }

                return this.ticketRepository.create({
                    eventId,
                    userId: session.user.id,
                    paymentId: payment?.id,
                }, entityManager);
            });
        } catch(error) {
            this.logger.error(`Unexpected error booing ticket: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }

    async reclaimTickets(eventId: string, entityManager: EntityManager) {
        try {
            const tickets = await this.ticketRepository.getByEventID(eventId, entityManager);

            const reclaimPromises = tickets.map(ticket => {
                if(!ticket.payment) return;
                const { payment } = ticket;
                if(payment.status === PaymentStatus.PENDING) {
                    return this.paymentRepository.delete(payment.id, entityManager);
                }

                if(payment.status === PaymentStatus.CHARGED) {
                    this.paymentRepository.reclaim(payment.id, entityManager);
                }
            });

            await Promise.all(reclaimPromises);
        } catch(error) {
            this.logger.error(`Unexpected error reclaiming ticket: ${error.message}`, error.stack);
            throw new InternalServerErrorException();
        }
    }
}
