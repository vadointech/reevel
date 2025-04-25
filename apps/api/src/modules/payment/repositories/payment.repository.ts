import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@/modules/repository";
import { PaymentsEntity } from "@/modules/payment/entities/payment.entity";
import { DataSource, DeepPartial, EntityManager, FindOptionsWhere } from "typeorm";

interface IPaymentRepository {
    create(input: DeepPartial<PaymentsEntity>): Promise<PaymentsEntity>;

    update(
        criteria: FindOptionsWhere<PaymentsEntity>,
        input: DeepPartial<PaymentsEntity>,
        entityManager?: EntityManager
    ): Promise<PaymentsEntity>;

    deleteByID(paymentId: string, entityManager?: EntityManager): Promise<boolean>;

    getByID(id: string): Promise<PaymentsEntity | null>;
    getByInvoiceID(invoiceId: string): Promise<PaymentsEntity | null>;

    saveCardToken(paymentId: string, cardToken: string, entityManager?: EntityManager): Promise<PaymentsEntity>;
}

@Injectable()
export class PaymentRepository extends BaseRepository implements IPaymentRepository {
    constructor(dataSource: DataSource) {
        super(dataSource);
    }

    create(input: DeepPartial<PaymentsEntity>, entityManager?: EntityManager): Promise<PaymentsEntity> {
        return this.queryRunner.create(PaymentsEntity, input, entityManager);
    }

    deleteByID(paymentId: string, entityManager?: EntityManager): Promise<boolean> {
        return this.queryRunner.delete(PaymentsEntity, { id: paymentId }, entityManager);
    }

    update(criteria: FindOptionsWhere<PaymentsEntity>, input: DeepPartial<PaymentsEntity>, entityManager?: EntityManager): Promise<PaymentsEntity> {
        return this.queryRunner.update(PaymentsEntity, criteria, input, entityManager);
    }

    getByID(id: string): Promise<PaymentsEntity | null> {
        return this.queryRunner.findOneBy(PaymentsEntity, { id });
    }

    saveCardToken(paymentId: string, cardToken: string, entityManager?: EntityManager): Promise<PaymentsEntity> {
        return this.queryRunner.update(PaymentsEntity, { id: paymentId }, {
            cardToken,
        }, entityManager);
    }

    getByInvoiceID(invoiceId: string): Promise<PaymentsEntity | null> {
        return this.queryRunner.findOneBy(PaymentsEntity, { invoiceId });
    }
}