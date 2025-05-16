import { BadRequestException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { MonobankApi } from "./monobank/types";
import { MonobankService } from "./monobank/monobank.service";
import { PaymentRepository } from "./repositories/payment.repository";
import { PaymentEmitter } from "./payment.emitter";
import { PaymentStatus } from "./entities/payment.entity";

@Injectable()
export class PaymentWebhook {
    private logger = new Logger(PaymentWebhook.name);

    constructor(
        private readonly monobankService: MonobankService,
        private readonly paymentEmitter: PaymentEmitter,
        private readonly paymentRepository: PaymentRepository,
    ) {}

    async invalidateInvoice(signToken: string, invoice: MonobankApi.InvoiceStatusResponse): Promise<boolean> {
        try {
            const valid = this.monobankService.verifyInvoiceSignature(invoice, signToken);
            if(!valid) {
                throw new UnauthorizedException("Invalid signature");
            }

            if(invoice.status === MonobankApi.InvoiceStatus.Created) {
                return true;
            }

            switch(invoice.status) {
                case MonobankApi.InvoiceStatus.Success:
                    await this.paymentRepository.update({ invoiceId: invoice.invoiceId }, {
                        status: PaymentStatus.CHARGED,
                        cardToken: invoice.walletData?.cardToken,
                    });
                    this.paymentEmitter.paymentSuccess(invoice);
                    break;
                case MonobankApi.InvoiceStatus.Failure:
                    await this.paymentRepository.update({ invoiceId: invoice.invoiceId }, {
                        status: PaymentStatus.FAILED,
                    });
                    this.paymentEmitter.paymentFailure(invoice);
                    break;
            }

            return true;
        } catch(error) {
            this.logger.error(`Unexpected error invalidating invoice: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }
}