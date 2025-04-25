import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { MonobankApi } from "./monobank/types";
import { MonobankService } from "./monobank/monobank.service";
import { PaymentRepository } from "./repositories/payment.repository";
import { PaymentEmitter } from "./payment.emitter";

@Injectable()
export class PaymentWebhook {
    private logger = new Logger(PaymentWebhook.name);

    constructor(
        private readonly monobankService: MonobankService,
        private readonly paymentEmitter: PaymentEmitter,
        private readonly paymentRepository: PaymentRepository,
    ) {}

    async invalidateInvoice(signToken: string, invoice: MonobankApi.InvoiceStatusResponse) {
        try {
            const valid = this.monobankService.verifyInvoiceSignature(invoice, signToken);
            if(!valid) {
                throw new UnauthorizedException("Invalid signature");
            }

            const payment = await this.paymentRepository.getByInvoiceID(invoice.invoiceId);

            if(!payment) {
                throw new NotFoundException("Invoice doesn't exist");
            }

            switch(invoice.status) {
                case MonobankApi.InvoiceStatus.Success:
                    this.paymentEmitter.paymentSuccess(invoice);
                    break;
                case MonobankApi.InvoiceStatus.Failure:
                    this.paymentEmitter.paymentFailure(invoice);
                    break;
            }
        } catch(error) {
            this.logger.error(`Unexpected error invalidating invoice: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }
}