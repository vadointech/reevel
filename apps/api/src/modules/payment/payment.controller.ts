import { Body, Controller, Param, Post, Headers, HttpCode, Get, Res } from "@nestjs/common";
import { Public } from "@/decorators";
import { MonobankApi } from "@/modules/payment/monobank/types";
import { PaymentService } from "@/modules/payment/payment.service";
import { PaymentWebhook } from "@/modules/payment/payment.webhook";
import { Response } from "express";
import { ConfigService } from "@/config/config.service";

@Controller("payments")
export class PaymentController {

    constructor(
        private readonly paymentService: PaymentService,
        private readonly paymentWebhook: PaymentWebhook,
        private readonly configService: ConfigService,
    ) {}

    @Public()
    @Post("invoice/webhook")
    @HttpCode(200)
    webhookRedirect(
        @Body() body: MonobankApi.InvoiceStatusResponse,
        @Headers("x-sign") xSign: string,
    ) {
        return this.paymentWebhook.invalidateInvoice(xSign, body);
    }

    @Public()
    @Get(":paymentId/event/redirect")
    async invoiceRedirect(
        @Param("paymentId") paymentId: string,
        @Res({ passthrough: true }) response: Response,
    ) {
        const eventId = await this.paymentService.checkEventPaymentStatus(paymentId);
        if(eventId) {
            return response.redirect(this.configService.env("PWA_PUBLIC_URL") + `/events/${eventId}/success`);
        } else {
            return response.redirect(this.configService.env("PWA_PUBLIC_URL") + `/events/${eventId}/success`);
        }
    }

    @Post(":paymentId/refund")
    refundInvoice(
        @Param("paymentId") paymentId: string,
    ) {
        return this.paymentService.refundFunds(paymentId);
    }
}
