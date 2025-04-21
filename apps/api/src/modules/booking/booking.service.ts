import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { DataSource, EntityManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { EventsEntity } from "@/modules/event/entities/events.entity";
import { TicketsEntity } from "@/modules/booking/entities/tickets.entity";
import { PaymentService } from "@/modules/payment/payment.service";
import { PaymentsEntity, PaymentStatus, PaymentType } from "@/modules/payment/entities/payment.entity";

@Injectable()
export class BookingService {
    private logger = new Logger(BookingService.name);

    constructor(
        @InjectRepository(EventsEntity)
        private readonly eventsRepository: Repository<EventsEntity>,
        @InjectRepository(TicketsEntity)
        private readonly ticketRepository: Repository<TicketsEntity>,
        private readonly paymentService: PaymentService,
        private readonly dataSource: DataSource,
    ) {}

    async bookTicket(userId: string, eventId: string) {
        try {
            const dbEvent = await this.eventsRepository.findOneBy({ id: eventId });
            if(!dbEvent) {
                throw new NotFoundException("Event doesn't exist");
            }


            if(dbEvent.ticketsAvailable !== null && dbEvent.ticketsAvailable !== undefined) {
                if(dbEvent.ticketsAvailable === 0) {
                    throw new BadRequestException("No tickets left");
                }

                const ticketsCount = await this.ticketRepository.countBy({ eventId });
                if(ticketsCount === dbEvent.ticketsAvailable) {
                    throw new BadRequestException("No tickets left");
                }
            }

            const dbTicket = await this.ticketRepository.findOneBy({ userId, eventId });
            if(dbTicket) {
                throw new BadRequestException("Ticket already exists");
            }

            return this.dataSource.transaction(async entityManager => {
                let payment: PaymentsEntity | undefined = undefined;

                if(dbEvent.ticketPrice) {
                    payment = await this.paymentService.createPayment(entityManager, {
                        type: PaymentType.BOOKING_FEE,
                        amount: dbEvent.ticketPrice,
                        userId,
                    });
                }

                return entityManager.save(TicketsEntity, {
                    eventId,
                    userId,
                    paymentId: payment?.id,
                });
            });
        } catch(error) {
            this.logger.error(`Unexpected error booing ticket: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }

    async reclaimTickets(entityManager: EntityManager, eventId: string) {
        const tickets = await entityManager.find(TicketsEntity, {
            where: { eventId },
            relations: {
                payment: true,
            },
        });

        const reclaimPromises = tickets.map(item => {
            if(!item.payment) return;

            if(item.payment.status === PaymentStatus.PENDING) {
                return this.paymentService.deletePayment(entityManager, item.payment.id);
            }

            if(item.payment.status === PaymentStatus.CHARGED) {
                return this.paymentService.reclaimPayment(entityManager, item.payment.id);
            }
        });

        await Promise.all(reclaimPromises);
    }
}
