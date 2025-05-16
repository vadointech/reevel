import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { MonobankApi } from "@/modules/payment/monobank/types";

export namespace PaymentEmitterEvents {
    export namespace PaymentSuccess {
        export const name = "payment:success";
        export type Payload = MonobankApi.InvoiceStatusResponse;
    }

    export namespace PaymentFailure {
        export const name = "payment:failure";
        export type Payload = MonobankApi.InvoiceStatusResponse;
    }
}

@Injectable()
export class PaymentEmitter {
    constructor(
        private readonly eventEmitter: EventEmitter2,
    ) {}

    paymentSuccess(invoice: PaymentEmitterEvents.PaymentSuccess.Payload) {
        this.eventEmitter.emit(PaymentEmitterEvents.PaymentSuccess.name, invoice);
    }

    paymentFailure(invoice: PaymentEmitterEvents.PaymentFailure.Payload) {
        this.eventEmitter.emit(PaymentEmitterEvents.PaymentFailure.name, invoice);
    }
}