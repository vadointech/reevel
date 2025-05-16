import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";

import { MonobankService } from "@/modules/payment/monobank/monobank.service";
import { ConfigService } from "@/config/config.service";

import { PaymentRepository } from "@/modules/payment/repositories/payment.repository";
import { EventTicketsRepository } from "@/modules/event/repositories/event-tickets.repository";

import { CreateInvoiceDto } from "@/modules/payment/dto/create-invoice.dto";
import { PaymentStatus, PaymentType } from "@/modules/payment/entities/payment.entity";
import { Session } from "@/types";

@Injectable()
export class PaymentService {
    private logger = new Logger(PaymentService.name);

    constructor(
        private readonly monobankService: MonobankService,
        private readonly configService: ConfigService,

        private readonly paymentRepository: PaymentRepository,
        private readonly eventTicketsRepository: EventTicketsRepository,

        private readonly dataSource: DataSource,
    ) {}

    async createInvoice(session: Session, input: CreateInvoiceDto) {
        try {
            let redirectUrl = this.configService.env("API_PUBLIC_URL_INTERFACE") + `/payments/${input.paymentId}`;

            if(input.paymentType === PaymentType.BOOKING_FEE) {
                redirectUrl += "/event/redirect";
            }

            return this.monobankService.createInvoice({
                amount: input.ticketPrice * 100,
                ccy: input.ticketCurrency,
                saveCardData: {
                    walletId: session.user.id,
                    saveCard: true,
                },
                redirectUrl: redirectUrl,
                webHookUrl: this.configService.env("API_PUBLIC_URL_INTERFACE") + "/payments/invoice/webhook",
            });
        } catch(error) {
            this.logger.error(`Unexpected error creating invoice: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }

    async deleteInvoice(invoiceId: string) {
        try {
            return this.monobankService.deleteInvoice(invoiceId);
        } catch(error) {
            this.logger.error(`Unexpected error deleting invoice: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }

    async checkEventPaymentStatus(paymentId: string): Promise<string | null> {
        try {
            const ticket = await this.eventTicketsRepository.findOne({
                where: { paymentId },
                relations: {
                    payment: true,
                },
            });

            if(!ticket || !ticket.payment) {
                return null;
            }

            switch(ticket.payment.status) {
                case PaymentStatus.FAILED:
                    this.monobankService.deleteInvoice(ticket.payment.invoiceId);
                    await this.dataSource.transaction(async entityManager => {
                        this.paymentRepository.delete({ id: paymentId }, entityManager);
                        this.eventTicketsRepository.delete({ paymentId: paymentId }, entityManager);
                    });
                    break;
            }

            return ticket.eventId;
        } catch(error) {
            this.logger.error(`Unexpected error checking event payment: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }

    async refundFunds(paymentId: string) {
        try {
            const payment = await this.paymentRepository.findOneBy({ id: paymentId });

            if(!payment) {
                throw new NotFoundException("Invoice does not exist");
            }

            return this.monobankService.cancelInvoice(payment.invoiceId);
            // if(payment.status === PaymentStatus.CHARGED) {
            //     if(payment.cardToken) {
            //         return await this.monobankService.makePayment({
            //             cardToken: payment.cardToken,
            //             amount: payment.amount,
            //             ccy: payment.currency,
            //             initiationKind: MonobankApi.PaymentInitialization.Merchant,
            //         });
            //     } else {
            //         await this.reclaimFunds(paymentId);
            //     }
            // }
        } catch(error) {
            this.logger.error(`Unexpected error refunding invoice: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }
}
