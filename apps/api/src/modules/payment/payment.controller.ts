import { Body, Controller, Param, Post, Headers } from "@nestjs/common";
import { Public } from "@/decorators";
import { MonobankApi } from "@/modules/payment/monobank/types";
import { PaymentService } from "@/modules/payment/payment.service";
import { PaymentWebhook } from "@/modules/payment/payment.webhook";

@Controller("payments")
export class PaymentController {

    constructor(
        private readonly paymentService: PaymentService,
        private readonly paymentWebhook: PaymentWebhook,
    ) {}

    @Public()
    @Post("invoice/webhook")
    webhookRedirect(
        @Body() body: MonobankApi.InvoiceStatusResponse,
        @Headers("x-sign") xSign: string,
    ) {
        return this.paymentWebhook.invalidateInvoice(xSign, body);
    }

    @Post("invoice/:invoiceId/refund")
    refundInvoice(
        @Param("invoiceId") invoiceId: string,
    ) {
        return this.paymentService.refundFunds(invoiceId);
    }
}
