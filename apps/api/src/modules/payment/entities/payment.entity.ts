import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "@/modules/user/entities/user.entity";
import { EventTicketsEntity } from "@/modules/event/entities/event-tickets.entity";
import { SubscriptionEntity } from "@/modules/subscription/entities/subscription.entity";

export enum PaymentType {
    BOOKING_FEE = "BOOKING_FEE",
    SUBSCRIPTION = "SUBSCRIPTION",
}

export enum PaymentStatus {
    PENDING = "PENDING",
    CHARGED = "CHARGED",
    RECLAIMED = "RECLAIMED",
    REFUNDED = "REFUNDED",
    FAILED = "FAILED",
}

export enum SupportedCurrencies {
    UAH = "980",
    USD = "840",
    EUR = "978",
}

@Entity("payments")
export class PaymentsEntity {
    @PrimaryColumn("uuid")
    id: string;

    @Column()
    invoiceId: string;

    @Column({ nullable: true })
    cardToken?: string;

    @Column({ type: "enum", enum: SupportedCurrencies, default: SupportedCurrencies.UAH })
    currency: SupportedCurrencies;

    @Column({ type: "enum", enum: PaymentType })
    type: PaymentType;

    @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.PENDING })
    status: PaymentStatus;

    @Column({ type: "decimal", default: 0 })
    amount: number;

    @Column()
    userId: string;
    @JoinColumn({ name: "userId" })
    @ManyToOne(() => UserEntity, user => user.payments, { onDelete: "CASCADE" })
    user: UserEntity;

    @OneToOne(() => EventTicketsEntity, ticket => ticket.payment)
    ticket: EventTicketsEntity;

    @OneToOne(() => SubscriptionEntity, subscription => subscription.payment)
    subscription: SubscriptionEntity;
}