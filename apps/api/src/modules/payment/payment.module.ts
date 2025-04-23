import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentsEntity } from "@/modules/payment/entities/payment.entity";
import { PaymentRepository } from "@/modules/payment/repositories/payment.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([PaymentsEntity]),
    ],
    controllers: [PaymentController],
    providers: [PaymentRepository, PaymentService],
    exports: [PaymentService],
})
export class PaymentModule {}
