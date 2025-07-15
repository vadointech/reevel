import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "@/modules/user/entities/user.entity";
import { PaymentsEntity } from "@/modules/payment/entities/payment.entity";

export enum SubscriptionType {
    DEFAULT = "DEFAULT",
    PLUS = "PLUS",
    PREMIUM = "PREMIUM",
}

@Entity("subscriptions")
export class SubscriptionEntity {
    @Column({ type: "enum", enum: SubscriptionType, default: SubscriptionType.PREMIUM })
    type: SubscriptionType;

    @PrimaryColumn()
    userId: string;
    @JoinColumn({ name: "userId" })
    @OneToOne(() => UserEntity, user => user.subscription, { onDelete: "CASCADE" })
    user: UserEntity;

    @Column({ nullable: true })
    paymentId?: string;
    @JoinColumn({ name: "paymentId" })
    @OneToOne(() => PaymentsEntity, payment => payment.ticket, { onDelete: "SET NULL" })
    payment: PaymentsEntity;
}