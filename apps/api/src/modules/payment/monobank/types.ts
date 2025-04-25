import { PaymentsEntity } from "@/modules/payment/entities/payment.entity";

export namespace MonobankApi {
    export enum InvoiceStatus {
        Created = "created",
        Processing = "processing",
        Success = "success",
        Failure = "failure",
    }

    export enum WalletCardStatus {
        New = "new",
        Created = "created",
    }

    export enum PaymentInitialization {
        Merchant = "merchant",
        Client = "client",
    }


    export type InvoiceResponse = {
        invoiceId: string;
        pageUrl: string;
    };


    export type InvoiceStatusResponse = {
        invoiceId: string;
        status: InvoiceStatus;
        amount: number;
        finalAmount?: number;
        ccy: number;
        createdDate: Date;
        modifiedDate: Date;
        payMethod?: string;
        paymentInfo?: PaymentInfo;
        walletData?: WalletData;
    };

    export type WalletData = {
        walletId: string;
        cardToken?: string;
        status: WalletCardStatus;
    };

    export type PaymentInfo = {
        rrn: string
        approvalCode: string;
        tranId: string;
        terminal: string;
        bank: string;
        paymentSystem: string;
        country: string;
        fee: number;
        paymentMethod: string;
        maskedPan: string;
    };
}

