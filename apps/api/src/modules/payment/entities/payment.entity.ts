import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "@/modules/user/entities/user.entity";
import { TicketsEntity } from "@/modules/booking/entities/tickets.entity";
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
}

@Entity("payments")
export class PaymentsEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

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

    @OneToOne(() => TicketsEntity, ticket => ticket.payment)
    ticket: TicketsEntity;

    @OneToOne(() => SubscriptionEntity, subscription => subscription.payment)
    subscription: SubscriptionEntity;
}