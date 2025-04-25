import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { PaymentRepository } from "@/modules/payment/repositories/payment.repository";
import { MonobankModule } from "@/modules/payment/monobank/monobank.module";
import { PaymentWebhook } from "@/modules/payment/payment.webhook";
import { PaymentEmitter } from "@/modules/payment/payment.emitter";

@Module({
    imports: [
        MonobankModule,
    ],
    controllers: [PaymentController],
    providers: [
        PaymentService,
        PaymentWebhook,
        PaymentRepository,
        PaymentEmitter,
    ],
    exports: [PaymentService],
})
export class PaymentModule {}
