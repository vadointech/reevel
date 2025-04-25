import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { EventsEntity } from "@/modules/event/entities/events.entity";
import { UserEntity } from "@/modules/user/entities/user.entity";
import { PaymentsEntity } from "@/modules/payment/entities/payment.entity";

@Entity("event_tickets")
export class EventTicketsEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    eventId: string;
    @JoinColumn({ name: "eventId" })
    @ManyToOne(() => EventsEntity, event => event.tickets, { onDelete: "CASCADE" })
    event: EventsEntity;

    @PrimaryColumn()
    userId: string;
    @JoinColumn({ name: "userId" })
    @ManyToOne(() => UserEntity, user => user.tickets, { onDelete: "CASCADE" })
    user: UserEntity;

    @Column({ nullable: true })
    paymentId?: string;
    @JoinColumn({ name: "paymentId" })
    @OneToOne(() => PaymentsEntity, payment => payment.ticket, { onDelete: "SET NULL" })
    payment?: PaymentsEntity;
}