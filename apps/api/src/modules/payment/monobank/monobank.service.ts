import { BadRequestException, Injectable, Logger } from "@nestjs/common";

import { ConfigService } from "@/config/config.service";

import { CreateInvoiceMonobankDto } from "./dto/create-invoice.dto";
import { MakePaymentDto } from "@/modules/payment/monobank/dto/refund-invoice.dto";

import { transformAndValidate } from "class-transformer-validator";
import crypto from "node:crypto";

import { MonobankApi } from "@/modules/payment/monobank/types";

@Injectable()
export class MonobankService {
    private logger = new Logger(MonobankService.name);

    private BASE_API_URL = "https://api.monobank.ua/api";
    private BASE_API_HEADERS = new Headers();

    constructor(
        private readonly configService: ConfigService,
    ) {
        this.BASE_API_HEADERS.set("Content-Type", "application/json");
        this.BASE_API_HEADERS.set("X-Token", this.configService.env("MONOBANK_PUBLIC_API_TOKEN"));
    }
    
    async createInvoice(input: CreateInvoiceMonobankDto): Promise<MonobankApi.InvoiceResponse> {
        try {
            const dto = await transformAndValidate(CreateInvoiceMonobankDto, input);

            const response = await fetch(this.BASE_API_URL + "/merchant/invoice/create", {
                method: "POST",
                headers: this.BASE_API_HEADERS,
                body: JSON.stringify(dto),
            });

            return await this.handleResponse(response);
        } catch(error) {
            this.logger.error(`Unexpected error creating invoice: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }

    async deleteInvoice(invoiceId: string) {
        try {
            const response = await fetch(this.BASE_API_URL + "/merchant/invoice/remove", {
                method: "POST",
                headers: this.BASE_API_HEADERS,
                body: JSON.stringify({
                    invoiceId,
                    redirectUrl: this.configService.env("API_PUBLIC_URL_INTERFACE") + `/payments/invoice/${invoiceId}/redirect`,
                    webHookUrl: this.configService.env("API_PUBLIC_URL_INTERFACE") + "/payments/invoice/webhook",
                }),
            });

            return await this.handleResponse(response);
        } catch(error) {
            this.logger.error(`Unexpected error deleting invoice: ${error.message}`, error.stack);
            throw new BadRequestException(error);
        }
    }

    async cancelInvoice(invoiceId: string) {
        try {
            const response = await fetch(this.BASE_API_URL + "/merchant/invoice/cancel", {
                method: "POST",
                headers: this.BASE_API_HEADERS,
                body: JSON.stringify({
                    invoiceId,
                }),
            });

            return await this.handleResponse(response);
        } catch(error) {
            this.logger.error(`Unexpected error canceling invoice: ${error.message}`, error.stack);
            throw new BadRequestException(error);
        }
    }

    async makePayment(input: MakePaymentDto) {
        try {
            const response = await fetch(this.BASE_API_URL + "/merchant/wallet/payment", {
                method: "POST",
                headers: this.BASE_API_HEADERS,
                body: JSON.stringify({
                    cardToken: input.cardToken,
                    amount: input.amount ? Number(input.amount) : 0,
                    ccy: input.ccy ? Number(input.ccy) : 980, // Hryvna
                    initiationKind: input.initiationKind,
                    redirectUrl: this.configService.env("API_PUBLIC_URL_INTERFACE") + "/payments/invoice/redirect",
                    webHookUrl: this.configService.env("API_PUBLIC_URL_INTERFACE") + "/payments/invoice/webhook",
                }),
            });

            return await this.handleResponse(response);
        } catch(error) {
            this.logger.error(`Unexpected error refunding invoice: ${error.message}`, error.stack);
            throw new BadRequestException(error);
        }
    }

    verifyInvoiceSignature(invoice: MonobankApi.InvoiceStatusResponse, signature: string) {
        const signatureBuf = Buffer.from(signature, "base64");
        const publicKeyBuf = Buffer.from(this.configService.env("MONOBANK_MERCHANT_PUBLIC_KEY"), "base64");


        const verify = crypto.createVerify("SHA256");

        verify.write(JSON.stringify(invoice));
        verify.end();

        return verify.verify(publicKeyBuf, signatureBuf);
    };

    private async handleResponse(response: Response) {
        const body = await response.json();

        if (!response.ok) {
            throw new BadRequestException(body);
        }

        return body;
    }

}