import { Injectable } from "@nestjs/common";
import { Repository } from "@/modules/repository";
import { PaymentsEntity } from "@/modules/payment/entities/payment.entity";
import { DataSource } from "typeorm";

@Injectable()
export class PaymentRepository extends Repository<PaymentsEntity> {
    constructor(dataSource: DataSource) {
        super(dataSource, PaymentsEntity);
    }
}