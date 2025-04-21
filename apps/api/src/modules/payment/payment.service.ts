import { EntityManager } from "typeorm";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { PaymentsEntity, PaymentStatus } from "./entities/payment.entity";
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Injectable()
export class PaymentService {
    private logger = new Logger(PaymentService.name);
  
    constructor() {}

    async createPayment(entityManager: EntityManager, input: CreatePaymentDto & { userId: string }): Promise<PaymentsEntity> {
        try {
            return entityManager.save(PaymentsEntity, {
                type: input.type,
                amount: input.amount,
                userId: input.userId,
                status: PaymentStatus.PENDING,
            });
        } catch(error) {
            this.logger.error(`Unexpected error making payment: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }

    async reclaimPayment(entityManager: EntityManager, paymentId: string): Promise<boolean> {
        try {
            await entityManager.update(PaymentsEntity, { id: paymentId }, {
                status: PaymentStatus.RECLAIMED,
            });

            return true;
        } catch(error) {
            this.logger.error(`Unexpected error reclaiming payment: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }

    async deletePayment(entityManager: EntityManager, paymentId: string): Promise<boolean> {
        try {
            await entityManager.delete(PaymentsEntity, { id: paymentId });
            return true;
        } catch(error) {
            this.logger.error(`Unexpected error deleting payment: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }
}
