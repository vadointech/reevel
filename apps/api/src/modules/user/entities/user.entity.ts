import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileEntity } from "@/modules/profile/entities/profile.entity";
import { EventHostsEntity } from "@/modules/event/entities/event-hosts.entity";
import { TicketsEntity } from "@/modules/booking/entities/tickets.entity";
import { PaymentsEntity } from "@/modules/payment/entities/payment.entity";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    email: string;

    @OneToOne(() => ProfileEntity, (profile) => profile.user)
    profile: ProfileEntity;

    @OneToMany(() => TicketsEntity, ticket => ticket.user)
    tickets: TicketsEntity[];

    @OneToMany(() => EventHostsEntity, event => event.user)
    events: EventHostsEntity[];

    @OneToMany(() => PaymentsEntity, payment => payment.user)
    payments: PaymentsEntity[];
}