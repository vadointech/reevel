import { MonobankApi } from "@/modules/payment/monobank/types";

export class MakePaymentDto {
    cardToken: string;
    amount: number;
    ccy: string;
    initiationKind: MonobankApi.PaymentInitialization;
}