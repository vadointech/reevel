import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PaymentRepository } from "@/modules/payment/repositories/payment.repository";
import { MonobankApi } from "@/modules/payment/monobank/types";
import { PaymentStatus, SupportedCurrencies } from "@/modules/payment/entities/payment.entity";
import { Session } from "@/types";
import { DataSource } from "typeorm";
import { MonobankService } from "@/modules/payment/monobank/monobank.service";
import { CreateInvoiceDto } from "@/modules/payment/monobank/dto/create-invoice.dto";
import { DeleteInvoiceDto } from "@/modules/payment/monobank/dto/delete-invoice.dto";

@Injectable()
export class PaymentService {
    private logger = new Logger(PaymentService.name);

    constructor(
        private readonly monobankService: MonobankService,

        private readonly paymentRepository: PaymentRepository,

        private readonly dataSource: DataSource,
    ) {}

    async createInvoice(session: Session, input: CreateInvoiceDto) {
        try {
            return this.monobankService.createInvoice({
                amount: input.amount,
                agentFeePercent: 7,
                ccy: SupportedCurrencies.EUR,
                saveCardData: {
                    walletId: session.user.id,
                    saveCard: true,
                },
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
            this.logger.error(`Unexpected error canceling invoice: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }

    async chargeFunds(invoice: MonobankApi.InvoiceStatusResponse) {
        try {
            return this.dataSource.transaction(async entityManager => {
                let payment = await this.paymentRepository.update({ invoiceId: invoice.invoiceId }, {
                    status: PaymentStatus.CHARGED,
                }, entityManager);

                if(invoice.walletData?.cardToken) {
                    payment = await this.paymentRepository.update({ invoiceId: invoice.invoiceId }, {
                        cardToken: payment.cardToken,
                        status: PaymentStatus.CHARGED,
                    }, entityManager);
                }

                return payment;
            });
        } catch(error) {
            this.logger.error(`Unexpected error charging funds: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }

    async reclaimFunds(paymentId: string) {
        try {
            const invoice = await this.paymentRepository.getByID(paymentId);

            if(!invoice) {
                throw new NotFoundException("Invoice does not exist");
            }

            if(invoice.status === PaymentStatus.CHARGED) {
                await this.paymentRepository.update({ id: paymentId }, {
                    status: PaymentStatus.RECLAIMED,
                });
            }
        } catch(error) {
            this.logger.error(`Unexpected error reclaiming invoice: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }

    async refundFunds(paymentId: string) {
        try {
            const invoice = await this.paymentRepository.getByID(paymentId);

            if(!invoice) {
                throw new NotFoundException("Invoice does not exist");
            }

            if(invoice.cardToken && invoice.status === PaymentStatus.CHARGED) {
                await this.monobankService.makePayment({
                    cardToken: invoice.cardToken,
                    amount: invoice.amount,
                    ccy: invoice.currency,
                    initiationKind: MonobankApi.PaymentInitialization.Merchant,
                });
            }
        } catch(error) {
            this.logger.error(`Unexpected error refunding invoice: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }
}
