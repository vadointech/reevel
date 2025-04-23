import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@/modules/repository";
import { PaymentsEntity, PaymentStatus } from "@/modules/payment/entities/payment.entity";
import { DataSource, DeepPartial, EntityManager } from "typeorm";

interface IPaymentRepository {
    create(input: PaymentsEntity): Promise<PaymentsEntity>;
    delete(id: string): Promise<boolean>;
    reclaim(id: string): Promise<boolean>;
}

@Injectable()
export class PaymentRepository extends BaseRepository implements IPaymentRepository {
    constructor(dataSource: DataSource) {
        super(dataSource);
    }

    create(input: DeepPartial<PaymentsEntity>, entityManager?: EntityManager): Promise<PaymentsEntity> {
        return this.query(PaymentsEntity, (repository) => {
            return repository.save(
                repository.create(input),
            );
        }, entityManager);
    }

    delete(paymentId: string, entityManager?: EntityManager): Promise<boolean> {
        return this.query(PaymentsEntity, async(repository) => {
            await repository.delete({ id: paymentId });
            return true;
        }, entityManager);
    }

    reclaim(paymentId: string, entityManager?: EntityManager): Promise<boolean> {
        return this.query(PaymentsEntity, async(repository) => {
            await repository.update({ id: paymentId }, {
                status: PaymentStatus.RECLAIMED,
            });
            return true;
        }, entityManager);
    }
}